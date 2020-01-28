const gitBranch = require("./gitBranch");
const { taskRegExp } = require("./config");

module.exports = async () => {
  const branch = await gitBranch();
  const taskRe = new RegExp(taskRegExp);
  const result = taskRe.exec(branch);
  if (!(result && result[0])) {
    return null;
  }
  return result[0];
};
