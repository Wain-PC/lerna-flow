const exec = require('./exec');

module.exports = async () => {
    const {stdout} = await exec('git tag --points-at HEAD');

    return stdout.split('\n').filter(l => l);
};
