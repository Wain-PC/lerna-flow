const open = require("open");
const jira = require("../tools/jira");
const logger = require("../tools/logger");

module.exports = async () => {
  const jiraUrl = await jira();
  open(jiraUrl);
  logger.log("Jira task should now be opened in your browser");
};
