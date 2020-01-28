const spawn = require("./spawn");

module.exports = async commitMessage => {
  const messageStr = commitMessage.replace(/\s/g, " ");
  const command = `git commit -a -m "${messageStr}"`;
  return spawn(command, { shell: true });
};
