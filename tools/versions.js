const {promisify} = require('util');
const unique = require('array-unique');
const semver = require('semver');
const exec = require('./exec');

module.exports = async () => {
    const {stdout} = await exec('lerna changed -l');
    const versions = stdout.split('\n').reduce((acc, line) => {
        const [name, version, path] = line.split(/\s+/);
        if (name && version && path) {
            const {major, minor, patch, prerelease} = semver.parse(version);
            const [preid] = prerelease;
            acc.push({name, version: {major, minor, patch, preid}, path});
        }
        return acc;
    }, []);

    const preIds = unique(versions.map(({preid}) => preid));
    const hasPrereleaseVersions = preIds.length > 0;

    return {
        versions,
        hasPrereleaseVersions,
        preIds
    }
};
