const semver = require('semver');

module.exports = (version) => {
    const {major, minor, patch, prerelease} = semver.parse(version);
    const [preid, preidVersion] = prerelease;
    return {string: version, major, minor, patch, preid, preidVersion};
};
