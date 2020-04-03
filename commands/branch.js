const branch = require("../tools/branch");
const tag = require("../tools/tag");
const askString = require("../tools/askString");
const changed = require("../tools/changed");

module.exports = async () => {
  const branchName = await askString(
    "This will pull the latest master & create new branch on top. Enter branch name:"
  );
  await branch(branchName, {
    throughMaster: true
  });
  const { hasChangedPackages } = await changed();
  if (hasChangedPackages) {
    await tag();
  }
};
