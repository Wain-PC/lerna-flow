const bump = require("../tools/bump");
const publish = require("../tools/publish");
const ask = require("../tools/ask");
const askString = require("../tools/askString");
const askChoice = require("../tools/askChoice");
const changed = require("../tools/changed");
const logger = require("../tools/logger");
const tagCommand = require("./tag");
const installCommand = require("./install");
const siblingsCommand = require("./siblings");

module.exports = async () => {
  const {
    versions,
    hasPrereleaseVersions,
    hasChangedPackages,
    preIds
  } = await changed();

  let tag = preIds[0] || "";

  if (hasChangedPackages) {
    logger.log(versions.map(({ name }) => name).join("\n"));
    const changedPackagesFine = await ask(
      `${versions.length} changed packages, is that OK?\n`
    );

    if (!changedPackagesFine) {
      await tagCommand();
      return;
    }

    // If we have stable versions now, we should bump them to dev first
    if (hasPrereleaseVersions) {
      const push = await ask("Push to git after versions update?");
      await bump({ type: "prerelease", push, tag });
    } else {
      tag = await askString("Enter dev tag:", "dev");
      const type = await askChoice(
        "Bump type?",
        ["premajor", "preminor", "prepatch"],
        "preminor"
      );
      const push = await ask("Push updated packages to git?");
      await bump({ type, tag, push });
    }
  }
  // Publish dev packages
  if (
    await ask(
      hasChangedPackages
        ? "Publish packages to NPM?"
        : "No changed packages found. You may try to publish already pushed packages to NPM."
    )
  ) {
    await publish();
    if (!(await siblingsCommand())) {
      if (await ask("Prepare NPM install line?")) {
        await installCommand();
      }
    }
  }
};
