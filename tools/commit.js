const spawn = require('./spawn');
const gitTask = require('./gitTask');

module.exports = async (commitMessage) => {
    const taskId = await gitTask();
    const command = `git commit -a -m "${taskId} ${commitMessage}"`;
    return spawn(command, {shell: true});
};
