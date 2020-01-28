const changedFromMaster = require("../tools/changedFromMaster");
const ask = require("../tools/ask");
const askType = require("../tools/askType");
const publish = require("../tools/publish");
const bump = require("../tools/bump");
const installCommand = require("./install");
const logger = require("../tools/logger");

const changelog = require("./changelog");

module.exports = async () => {
  // Find packages with prerelease tag
  const list = await changedFromMaster();
  const hasChangedPackages = list.length;

  if (hasChangedPackages) {
    logger.log(list.map(({ name }) => name).join("\n"));
    const changedPackagesFine = await ask(
      `Going to publish ${list.length} packages, is that OK?\n`
    );
    if (changedPackagesFine) {
      return;
    }

    if (await ask("Update changelogs?")) {
      await changelog();
    }
  }

  // Bump packages to stable
  const type = await askType();
  const push = await ask("Push updated packages to git?");
  await bump({ type, push });

  // Publish stable packages
  if (
    await ask(
      hasChangedPackages
        ? "Publish STABLE packages to NPM?"
        : "No changed packages found. You may try to publish already pushed packages to NPM."
    )
  ) {
    await publish();
    if (await ask("Prepare NPM install line?")) {
      await installCommand();
    }
  }
};
