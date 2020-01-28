const unique = require("array-unique");
const exec = require("./exec");
const parseList = require("./parseList");

module.exports = async () => {
  try {
    const { stdout } = await exec("lerna changed --json --include-merged-tags");
    const versions = parseList(stdout);
    const preIds = unique(
      versions.reduce((acc, { version: { preid } }) => {
        if (preid) {
          acc.push(preid);
        }
        return acc;
      }, [])
    );
    const hasPrereleaseVersions = preIds.length > 0;
    const hasChangedPackages = versions.length > 0;

    return {
      versions,
      hasPrereleaseVersions,
      hasChangedPackages,
      preIds
    };
  } catch (err) {
    if (err && err.message.includes("No changed packages found")) {
      return {
        versions: [],
        hasPrereleaseVersions: false,
        hasChangedPackages: false,
        preIds: []
      };
    }
    throw err;
  }
};
