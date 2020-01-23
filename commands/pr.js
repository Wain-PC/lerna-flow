const open = require('open');
const stash = require('../tools/stash');
const gitBranch = require('../tools/gitBranch');

module.exports = async () => {
  const {repositoryUrl} = await stash();
  if(!repositoryUrl) {
    console.log('Cannot determine repository URL from git remote, sorry =(');
    return;
  }
  const branch = await gitBranch();
  open(`${repositoryUrl}/pull-requests?create&sourceBranch=refs/heads/${branch}`);
  console.log('PR should now be opened in your browser');
};
