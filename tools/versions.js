const unique = require('array-unique');
const exec = require('./exec');
const parseList = require('./parseList');

module.exports = async () => {
    const {stdout} = await exec('lerna changed --json');
    const versions = parseList(stdout);
    console.log(versions.map(({version: {preid}}) => preid));
    const preIds = unique(versions.map(({version: {preid}}) => preid));
    const hasPrereleaseVersions = preIds.length > 0;

    return {
        versions,
        hasPrereleaseVersions,
        preIds
    }
};
