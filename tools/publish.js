const spawn = require('./spawn');

module.exports = (tag) => {
    const tagStr = tag ? `--dist-tag ${tag}` : '';
    const command = ['lerna publish from-package', tagStr].filter(v => v).join(' ');
    return spawn(command, {shell: true});
};
