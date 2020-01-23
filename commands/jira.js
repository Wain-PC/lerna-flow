const open = require('open');
const jira = require('../tools/jira');

module.exports = async () => {
    const jiraUrl = await jira();
    open(jiraUrl);

};
