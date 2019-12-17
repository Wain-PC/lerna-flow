const exec = require('./exec');

module.exports = () => {
    const {stdout} = exec('lerna changed --json');
    return parseList(stdout);
};
