const spawn = require('./spawn');

module.exports = (type) => {
    const tagStr = type === 'dev' ? `--dist-tag dev` : '';
    const command = ['lerna publish from-package', tagStr].filter(v => v).join(' ');
    return spawn(command, {shell: true});
};
