const spawn = require("./spawn");
const gitBranch = require("./gitBranch");

const masterBranch = "master";

module.exports = async branchName => {
  if (!branchName) {
    return;
  }

  const branch = await gitBranch();

  // 1. Checkout master.
  if (branch !== masterBranch) {
    try {
      await spawn(`git checkout ${masterBranch}`);
    } catch (err) {
      await spawn(`git checkout -b ${masterBranch}`);
    }
  }

  // 2. Pull latest changes from master.
  await spawn("git pull");

  // 3. Create new branch atop of master.
  try {
    await spawn(`git checkout -b ${branchName}`);
  } catch (err) {
    // do nothing
  }
};
