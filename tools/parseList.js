const parseVersion = require("./parseVersion");

module.exports = stdout =>
  JSON.parse(stdout).map(({ name, version, location: path }) => ({
    name,
    version: parseVersion(version),
    path
  }));
