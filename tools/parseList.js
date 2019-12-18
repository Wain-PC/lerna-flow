const semver = require('semver');

module.exports = (stdout) => {
    return JSON.parse(stdout).map(({name, version, location: path}) =>  {
        const {major, minor, patch, prerelease} = semver.parse(version);
        const [preid, preidVersion] = prerelease;
        return {name, version: {string: version, major, minor, patch, preid, preidVersion}, path};
    });
};
