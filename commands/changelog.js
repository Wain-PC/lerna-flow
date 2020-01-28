const changedFromMaster = require("../tools/changedFromMaster");
const changedDependencies = require("../tools/changedDependencies");
const askString = require("../tools/askString");
const changelog = require("../tools/changelog");
const changed = require("../tools/changed");
const tag = require("../tools/tag");
const ask = require("../tools/ask");
const commit = require("../tools/commit");
const gitTask = require("../tools/gitTask");
const logger = require("../tools/logger");

module.exports = async () => {
  const { versions } = await changed();
  const list = await changedFromMaster();

  if (!list.length) {
    logger.error("No changed packages found. Try commiting something.");
    return;
  }

  if (versions.length > list.length) {
    await tag();
  }

  logger.log("Packages to produce CHANGELOGs for:");

  list.forEach(({ name, containsChanges }) =>
    logger.log((containsChanges ? "* " : "  ") + name)
  );

  // Ask for CHANGELOG for each package.
  // eslint-disable-next-line no-restricted-syntax
  for (const { name, version, path, containsChanges, deps } of list) {
    const text = [];
    const depsList = changedDependencies(list, deps, name);
    if (containsChanges) {
      let string = "";
      let index = 0;
      do {
        index += 1;
        // eslint-disable-next-line no-await-in-loop
        string = await askString(
          `Changelog for package ${name} (line ${index}):`
        );
        if (string) {
          text.push(string);
        }
      } while (string);
    }
    // Update changelogs
    // eslint-disable-next-line no-await-in-loop
    await changelog({
      path,
      text,
      version,
      deps: depsList
    });
  }

  // Commit changelogs
  if (await ask("Commit changelogs?")) {
    // eslint-disable-next-line no-undef
    const taskId = await gitTask();
    const commitMessage = await askString(
      "Commit message:",
      `${taskId} Updated CHANGELOGs`
    );
    await commit(commitMessage);
  }
};
