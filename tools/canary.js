const spawn = require('./spawn');
const gitTask = require('./gitTask');
const {distTag} = require('./config');

module.exports = async (type, preId = distTag) => {
    const canaryStr = `--canary`;
    const tagStr = `--preid "${preId}"`;
    const distTagStr = `--dist-tag "${distTag}"`;

    const command = ['lerna publish', type, canaryStr, tagStr, distTagStr].filter(v=>v).join(' ');
    return spawn(command);


};
