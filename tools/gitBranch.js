const exec = require('./exec');

module.exports = async () => {
    const {stdout} = await exec('git rev-parse --abbrev-ref HEAD');
    return stdout.split('\n')[0];
};
