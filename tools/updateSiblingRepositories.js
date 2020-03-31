const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const path = require("path");
const readPackageJson = promisify(require("read-package-json"));
const hasFileAccess = require("./hasFileAccess");
const logger = require("./logger");
const exec = require("./exec");
const spawn = require("./spawn");
const findProjectRoot = require("./findProjectRoot");
const hasLerna = require("./hasLerna");
const ask = require("./ask");
const publishedPackages = require("./publishedPackages");

const parsePackageNames = list =>
  list.map(item => item.slice(0, item.lastIndexOf("@")));

const run = async ({ packages, absoluteDirectory, withLerna }) => {
  const { dependencies } = await readPackageJson(
    path.resolve(absoluteDirectory, "package.json")
  );

  console.log("-------------------------------");
  console.log("ABSDIR:", absoluteDirectory);
  console.log("PACKS:", packages);

  // Find common packages
  const commonPackages = parsePackageNames(packages).reduce(
    (acc, packageName, index) => {
      if (dependencies[packageName]) {
        acc.push(packages[index]);
      }
      return acc;
    },
    []
  );

  if (!commonPackages.length) {
    return;
  }

  const npmInstallLine = `npm install ${commonPackages.join(" ")}`;

  if (await ask(`Wanna do '${npmInstallLine}' in '${absoluteDirectory}'?`)) {
    await spawn(npmInstallLine, {
      cwd: absoluteDirectory
    });

    if (
      withLerna &&
      (await ask(`Wanna bump versions in repo '${absoluteDirectory}'?`))
    ) {
      await spawn("lerna-flow dev", {
        cwd: absoluteDirectory
      });
    }
  }
};

module.exports = async updatedPackages => {
  const packages = updatedPackages || (await publishedPackages());

  const projectRoot = await findProjectRoot();
  // One step from repo (package.json location)
  const projectsDir = path.resolve(projectRoot, "..");
  const siblingProjects = await readdir(projectsDir);
  for (let i = 0; i < siblingProjects.length; i += 1) {
    const directory = siblingProjects[i];
    const absoluteDirectory = path.resolve(projectsDir, directory);
    logger.log(`Now inspecting sibling project at '${absoluteDirectory}'`);

    if (
      absoluteDirectory !== projectRoot &&
      (await hasFileAccess(path.resolve(absoluteDirectory, "package.json")))
    ) {
      // Walk into each directory
      // Check whether it's a Lerna repository or a simple NPM repository.
      // It's a Lerna repo if the directory contains lerna.json
      if (await hasLerna(absoluteDirectory)) {
        const { stdout } = await exec("lerna ls -la --json", {
          cwd: absoluteDirectory
        });
        const lernaPackages = JSON.parse(stdout);
        console.log(
          `This lerna project contains ${JSON.stringify(
            lernaPackages
          )} packages`
        );
        // Visit each package, read its package.json and determine packages to update.
        // eslint-disable-next-line no-restricted-syntax
        for (const { location } of lernaPackages) {
          await run({
            absoluteDirectory: location,
            packages,
            withLerna: true
          });
        }
      } else {
        // Read package.json, find common packages and perform npm install.
        await run({
          absoluteDirectory,
          packages,
          withLerna: false
        });
      }
    }
  }
};
