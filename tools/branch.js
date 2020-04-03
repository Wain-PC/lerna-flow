const spawn = require("./spawn");
const logger = require("./logger");
const gitBranch = require("./gitBranch");

const masterBranch = "master";
const defaultOpts = {
  masterBranch: "master",
  throughMaster: true
};

module.exports = async (branchName, opts = {}) => {
  const options = {
    ...defaultOpts,
    ...opts
  };

  if (!branchName) {
    return;
  }

  const branch = await gitBranch();

  // If branch is already checked out, just pull the changes and exit.
  if (branch === branchName) {
    try {
      await spawn("git pull");
    } catch (err) {
      // do nothing
      logger.error(err);
    }

    return;
  }

  // If throughMaster === true, pull & checkout master first
  if (options.throughMaster && branch !== masterBranch) {
    try {
      await spawn(`git checkout ${masterBranch}`);
    } catch (err) {
      await spawn(`git checkout -b ${masterBranch}`);
    }
    // Pull latest changes from master.
    await spawn("git pull");
  }

  // 3. Create or checkout
  try {
    await spawn(`git checkout ${branchName}`);
  } catch (err) {
    await spawn(`git checkout -b ${branchName}`);
  }
};
