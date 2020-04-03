const spawn = require("./spawn");
const ask = require("./ask");
const askString = require("./askString");
const gitTask = require("./gitTask");

module.exports = async defaultCommitMessage => {
  // eslint-disable-next-line no-undef
  const taskId = await gitTask();
  const commitMessage = await askString(
    "Commit message:",
    `${taskId} ${defaultCommitMessage}`
  );

  const skipHooks = await ask("Skip git commit hooks?");

  const messageStr = commitMessage.replace(/\s/g, " ");
  const command = `git commit -a -m "${messageStr}" ${
    skipHooks ? "--no-verify" : ""
  }`;
  return spawn(command, { shell: true });
};
