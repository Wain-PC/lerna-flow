const gitTask = require("./gitTask");
const { jiraUrl } = require("../tools/config");

module.exports = async () => {
  const task = await gitTask();
  if (!task) {
    throw new Error("Unable to determine Jira task");
  }

  return `${jiraUrl}/browse/${task}`;
};
