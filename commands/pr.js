const open = require("open");
const stash = require("../tools/stash");
const gitBranch = require("../tools/gitBranch");
const gitTask = require("../tools/gitTask");
const logger = require("../tools/logger");

module.exports = async () => {
  const { repositoryUrl } = await stash();
  if (!repositoryUrl) {
    logger.log("Cannot determine repository URL from git remote, sorry =(");
    return;
  }
  const branch = await gitBranch();
  const task = await gitTask();
  open(
    `${repositoryUrl}/pull-requests?create&sourceBranch=refs/heads/${branch}&title=[WIP] ${task} `
  );
  logger.log("PR should now be opened in your browser");
};
