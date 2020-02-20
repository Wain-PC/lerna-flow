const exec = require("./exec");

module.exports = async () => {
  const { stdout: commit } = await exec("git rev-list --tags --max-count=1");
  const { stdout } = await exec(`git tag --points-at ${commit}`);

  return stdout.split("\n").filter(l => l);
};
