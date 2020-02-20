const exec = require("./exec");

module.exports = async (opts = {}) => {
  const { stdout } = await exec("git status --porcelain", opts);
  return stdout
    .split("\n")
    .filter(n => n)
    .map(str => {
      const [mode, file] = str.split(" ").filter(v => v);
      return { file, mode };
    });
};
