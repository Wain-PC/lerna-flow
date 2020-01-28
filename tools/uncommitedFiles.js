const exec = require("./exec");

module.exports = async () => {
  const { stdout } = await exec("git status --porcelain");
  return stdout
    .split("\n")
    .filter(n => n)
    .map(str => {
      const [, mode, file] = str.split(" ");
      return { file, mode };
    });
};
