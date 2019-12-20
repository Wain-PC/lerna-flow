const spawn = require('./spawn');

module.exports = (prod) => {
    const tagStr = prod ? '' : `--dist-tag dev`;
    const command = ['lerna publish from-package', tagStr].filter(v => v).join(' ');
    return spawn(command, {shell: true});
};
