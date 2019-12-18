const parseVersion = require('./parseVersion');

module.exports = (stdout) => {
    return JSON.parse(stdout).map(({name, version, location: path}) =>  {
        return {name, version: parseVersion(version), path};
    });
};
