const parseVersion = require('./parseVersion');

module.exports = (list, deps, packageName) => {
    const output = [];
    for(const {name} of list) {
        // Don't parse yourself
        if(name === packageName) {
            continue;
        }
        for(const dep of Object.keys(deps)) {
            if(dep === name) {
                output.push({
                    name: dep,
                    version: parseVersion(deps[dep])
                });
            }
        }
    }

    return output;
};
