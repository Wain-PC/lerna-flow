const exec = require('./exec');
const spawn = require('./spawn');

module.exports = async () => {
    await exec('git tag -l | xargs git tag -d');
    await spawn('git fetch --tags');
    await spawn('git tag -a latest_$(date +%s) -m latest_$(date +%s)');
    await spawn('git push --tags');
};
