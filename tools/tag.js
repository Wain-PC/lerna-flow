const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const spawn = require('./spawn');

module.exports = async () => {
    const now = Date.now();
    const tag = `latest_${now}`;
    await exec('git tag | xargs git tag -d');
    await spawn('git fetch --tags');
    await spawn(`git tag -a ${tag} -m ${tag}`);
    await spawn('git push --tags');
};
