const semver = require('semver');

module.exports = (stdout) => {
    return JSON.parse(stdout).map(({name, version, location: path}) =>  {
        const {major, minor, patch, prerelease} = semver.parse(version);
        const [preid] = prerelease;
        return {name, version: {major, minor, patch, preid}, path};
    });
};
