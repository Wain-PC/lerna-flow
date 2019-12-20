const open = require('open');
const jira = require('../tools/jira');
const gitBranch = require('../tools/gitBranch');

module.exports = async () => {
  const {repositoryUrl} = await jira();
  const branch = await gitBranch();
  open(`${repositoryUrl}/pull-requests?create&sourceBranch=refs/heads/${branch}`);
};
