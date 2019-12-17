const exec = require('./exec');
const parseList = require('./parseList');

module.exports = async () => {
    const {stdout} = await exec('lerna changed --json');
    return parseList(stdout);
};
