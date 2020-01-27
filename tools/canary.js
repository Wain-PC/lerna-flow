const spawn = require('./spawn');
const gitTask = require('./gitTask');

module.exports = async () => {
    const taskId = await gitTask();
    const canaryStr = `--canary`;
    const tagStr = `--preid "${taskId}"`;

    const command = ['lerna publish', canaryStr, tagStr].filter(v=>v).join(' ');
    return spawn(command);


};
