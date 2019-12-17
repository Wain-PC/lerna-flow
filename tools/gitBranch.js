const exec = require('./exec');

module.exports = () => {
    return exec('git rev-parse --abbrev-ref HEAD');
};
