const inquirer = require('inquirer');
const gitTask = require('./gitTask');
const exec = require('./exec');

module.exports = async (skipInquiry = false) => {
    const taskId = await gitTask();

    const {commitMessage} = skipInquiry ?
        {commitMessage: `${taskId} Updated dependencies`} :
        await inquirer.prompt([
            {
                type: 'string',
                name: 'commitMessage',
                message: 'Commit message',
                default: `Updated dependencies`,
                prefix: taskId
            }
        ]);

    await exec(`git commit -m "${commitMessage}"`);
};
