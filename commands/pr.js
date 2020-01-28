const open = require("open");
const stash = require("../tools/stash");
const gitBranch = require("../tools/gitBranch");
const gitTask = require("../tools/gitTask");

module.exports = async () => {
  const { repositoryUrl } = await stash();
  if (!repositoryUrl) {
    console.log("Cannot determine repository URL from git remote, sorry =(");
    return;
  }
  const branch = await gitBranch();
  const task = await gitTask();
  open(
    `${repositoryUrl}/pull-requests?create&sourceBranch=refs/heads/${branch}&title=[WIP] ${task} `
  );
  console.log("PR should now be opened in your browser");
};
