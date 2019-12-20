const exec = require('./exec');
const spawn = require('./spawn');

module.exports = async () => {
    const now = Date.now();
    const tag = `latest_${now}`;
    const {stdout} = spawn('git tag -l');
    await spawn('xargs git tag -d', {input: stdout});
    await spawn('git fetch --tags');
    await spawn(`git tag -a ${tag} -m ${tag}`);
    await spawn('git push --tags');
};
