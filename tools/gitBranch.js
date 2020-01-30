const exec = require("./exec");

module.exports = async (opts = {}) => {
  const { stdout } = await exec("git rev-parse --abbrev-ref HEAD", opts);
  return stdout.split("\n")[0];
};
