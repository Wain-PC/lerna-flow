const spawn = require('./spawn');
const askString = require('./askString');
const gitTask = require('./gitTask');

module.exports = async ({type, tag, push}) => {
    const taskId = await gitTask();
    const commitMessage = await askString('Commit message', `${taskId} Bump dev package versions`);
    const typeStr = type || '';
    const pushStr = push ? '' : '--no-push';
    const commitMessageStr = commitMessage ? `-m "${commitMessage}"` : '';
    const tagStr = tag ? `--preid "${tag}"` : '';

    const command = ['lerna version', typeStr, pushStr, commitMessageStr, tagStr].filter(v=>v).join(' ');
    // Run in the shell to allow interactive behavior
    return spawn(command, {shell: true});


};