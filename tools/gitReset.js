const exec = require("./exec");

module.exports = async (opts = {}) => {
  const { stdout } = await exec("git reset --hard HEAD", opts);
  return stdout.split("\n")[0];
};
