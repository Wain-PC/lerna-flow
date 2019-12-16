const exec = require('./exec');

module.exports = () => {
    return exec(`lerna publish from-package`);
};
