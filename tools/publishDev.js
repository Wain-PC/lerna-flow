const exec = require('./exec');

module.exports = (tag) => {
    return exec(`lerna publish from-package --dist-tag ${tag}`);
};
