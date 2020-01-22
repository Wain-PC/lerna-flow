const {promisify} = require('util');
const readPackageJson = promisify(require('read-package-json'));
const unique = require('array-unique');
const gitBranch = require('./gitBranch');
const exec = require('./exec');
const parseVersion = require('./parseVersion');
const changedDependencies = require('./changedDependencies');

module.exports = async (baseBranch = 'origin/master') => {
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
            packages[path] = {
                path,
                containsChanges: false
            };
        }
        if (line.endsWith('package.json')) {
            const {name, version, dependencies = {}, devDependencies = {}} = await readPackageJson(line);
            packages[path] = {...packages[path], name, version: parseVersion(version), deps: {...dependencies, ...devDependencies}};
        } else if(!excludedFiles.some(file =>line.endsWith(file))) {
            packages[path] = {...packages[path], containsChanges: true};
        }
    }

    return Object.values(packages)
        .filter(({name}) =>name) //filter out anything that doesn't have package.json
        .sort((a, b) => b.containsChanges - a.containsChanges);
};
