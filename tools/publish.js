const spawn = require('./spawn');

module.exports = () => {
    return spawn('lerna publish from-package', {shell: true});
};
