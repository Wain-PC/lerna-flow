// TODO: automatically resolve conflicts in CHANGELOGs as well.

const exec = require("./exec");
const spawn = require("./spawn");
const listContainsOnlySelectedFiles = require("./listContainsOnlySelectedFiles");
const { gitOrigin, masterBranch } = require("./config");

const abort = () => {
  try {
    return spawn("git merge --abort");
  } catch (err) {
    return null;
  }
};

const selectedFiles = ["package.json", "package.lock", "CHANGELOG.md"];

module.exports = async (master = `${gitOrigin}/${masterBranch}`) => {
  // Fetch latest master
  await spawn("git fetch");
  // Merge master into current branch
  try {
    await spawn(`git merge --no-edit ${master}`);
    return;
  } catch (err) {
    // Get list of conflicted files
    const { stdout } = await exec("git diff --name-only --diff-filter=U");
    const conflicts = stdout.split("\n");

    // If there're no conflicts or conflicts are ONLY in package.json or package.lock files, accept theirs automatically.
    if (
      conflicts.length &&
      listContainsOnlySelectedFiles(conflicts, selectedFiles)
    ) {
      await abort();
      await spawn(`git merge --no-edit -X theirs ${masterBranch}`);
      return;
    }
  }

  // Else fail miserably and let the user solve the conflicts manually.
  await abort();
};
