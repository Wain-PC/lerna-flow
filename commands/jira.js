const open = require('open');
const jira = require('../tools/jira');

module.exports = async () => {
    const jiraUrl = await jira();
    open(jiraUrl);
    console.log('Jira task should now be opened in your browser');
};
