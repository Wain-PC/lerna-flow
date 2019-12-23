const open = require('open');
const jira = require('../tools/jira');
const gitBranch = require('../tools/gitBranch');

module.exports = async () => {
  const {repositoryUrl} = await jira();
  if(!repositoryUrl) {
    console.log('Cannot determine repository URL from git remote, sorry =(');
    return;
  }
  const branch = await gitBranch();
  open(`${repositoryUrl}/pull-requests?create&sourceBranch=refs/heads/${branch}`);
  console.log('PR should now be opened in your browser');
};
