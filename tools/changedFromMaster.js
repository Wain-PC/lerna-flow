const {resolve} = require('path');
const {promisify} = require('util');
const readPackageJson = promisify(require('read-package-json'));
const unique = require('array-unique');
const gitBranch = require('./gitBranch');
const exec = require('./exec');
const parseVersion = require('./parseVersion');
const changedDependencies = require('./changedDependencies');
const {gitOrigin, masterBranch} = require('./config');

module.exports = async (baseBranch = `${gitOrigin}/${masterBranch}`) => {
    const branch = await gitBranch();
    const command = `git diff ${branch}..${baseBranch} --name-only`;
    const {stdout} = await exec(command);

    const packages = {};
    const excludedFiles = ['CHANGELOG.md', 'package.lock', 'yarn.lock'];
    for (const line of stdout.split('\n')) {
        const path = line.split('/').slice(0, 2).join('/');
        if(!path) {
            continue;
        }
        if(!packages[path]) {
            // Try to read package.json from a path
            try {
                const {name, version, dependencies = {}, devDependencies = {}} = await readPackageJson(resolve(path, 'package.json'));
                packages[path] = {
                    path,
                    name,
                    version: parseVersion(version),
                    deps: {...dependencies, ...devDependencies},
                    containsChanges: false
                };
            } catch(err) {
                // do nothing
            }
        }
        if(packages[path] && !excludedFiles.some(file =>line.endsWith(file))) {
            packages[path].containsChanges = true;
        }
    }

    return Object.values(packages)
        .filter(({name}) =>name) //filter out anything that doesn't have package.json
        .sort((a, b) => b.containsChanges - a.containsChanges);
};
