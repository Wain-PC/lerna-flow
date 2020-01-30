const { promisify } = require("util");
const access = promisify(require("fs").access);
const readdir = promisify(require("fs").readdir);
const path = require("path");
const readPackageJson = promisify(require("read-package-json"));
const logger = require("./logger");
const exec = require("./exec");
const spawn = require("./spawn");
const findProjectRoot = require("./findProjectRoot");
const hasLerna = require("./hasLerna");
const gitBranch = require("./gitBranch");
const uncommitedFiles = require("./uncommitedFiles");
const branch = require("../tools/branch");
const ask = require("../tools/ask");

module.exports = async updatedPackages => {
  const projectRoot = await findProjectRoot();
  const rootGitBranch = await gitBranch();
  // One step from repo (package.json location)
  const projectsDir = path.resolve(projectRoot, "..");
  const siblingProjects = await readdir(projectsDir);
  for (let i = 0; i < siblingProjects.length; i += 1) {
    const directory = siblingProjects[i];
    const absoluteDirectory = path.resolve(projectsDir, directory);

    if (await uncommitedFiles({ cwd: absoluteDirectory }).length) {
      // Skip if repo has uncommitted files in the current branch
      logger.error(
        `Repo ${directory} has uncommited files. Update will be skipped`
      );
      // eslint-disable-next-line no-continue
      continue;
    }

    // Walk into each directory
    // Check whether it's a Lerna repository or a simple NPM repository.
    // It's a Lerna repo if the directory contains lerna.json
    try {
      if (await hasLerna(absoluteDirectory)) {
        console.log(`${absoluteDirectory} has lerna`);
        const { stdout } = await exec("lerna ls -la --json", {
          cwd: absoluteDirectory
        });
        const lernaPackages = JSON.parse(stdout);
        // Visit each package, read its package.json and determine packages to update.
        // eslint-disable-next-line no-restricted-syntax
        for (const { name: lernaPackageName, location } of lernaPackages) {
          const { dependencies } = await readPackageJson(
            path.resolve(location, "package.json")
          );

          // eslint-disable-next-line no-restricted-syntax
          for (const dependency of Object.keys(dependencies)) {
            if (updatedPackages[dependency]) {
              // This package should be bumped.
              console.log(
                `Found dependency ${dependency} in package ${lernaPackageName} in sibling repo ${directory} (git branch:${await gitBranch(
                  { cwd: absoluteDirectory }
                )}`
              );
              // Determine whether we're on the same branch as in the 'root' repo.
              if (
                (await gitBranch({ cwd: absoluteDirectory })) !== rootGitBranch
              ) {
                if (
                  await ask(
                    `Git branch in repo ${directory} differs from current branch, create or switch?`
                  )
                ) {
                  await branch(rootGitBranch);
                }
              }
              // Update the package in scope using `lerna add --scope`
              await spawn(
                `lerna add ${dependency}@${updatedPackages[dependency]} --scope ${lernaPackageName}`
              );
            }
          }
        }
      } else if (
        await access(path.resolve(projectsDir, directory, "package.json"))
      ) {
        // do nothing
      }
    } catch (err) {
      // do nothing
      logger.error(err);
    }
  }

  // If it's a Lerna repository:
  // 1. Collect dependent packages
  // 2. Symlink them to current repo.
  // 3. Patch lerna to accept symlinked directories.
  // 4. Let lerna do its stuff.
  // 5. Reverse the patch.
};
