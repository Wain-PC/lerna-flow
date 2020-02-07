const exec = require("./exec");

module.exports = async (opts = {}) => {
  const { stdout } = await exec("git stash", opts);
  return stdout.split("\n")[0];
};
