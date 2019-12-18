const changedFromMaster = require('../tools/changedFromMaster');
const ask = require('../tools/ask');
const askString = require('../tools/askString');
const changelog = require('../tools/changelog');
const changedDependencies = require('../tools/changedDependencies');


module.exports = async () => {
    // Find packages with prerelease tag
    const list = await changedFromMaster();
    const hasChangedPackages = list.length;

    if(hasChangedPackages) {
        console.log(list.map(({name}) => name).join('\n'));
        const changedPackagesFine = await ask(`Going to publish ${list.length} packages, is that OK?\n`);
    }

    // Ask for CHANGELOG for each package.
    for(const {name, version, path, containsChanges, deps} of list) {
        const text = [];
        const depsList = changedDependencies(list, deps, name);
        let string = '';
        let index = 0;
        do {
            index++;
            string = await askString(`Changelog for package ${name} (line ${index}):`);
            if(string) {
                text.push(string);
            }
        } while(string);
        const changelogMD = await changelog({path, text, version, deps: depsList});
    }

    // Bump them to stable

    // Commit changes

    // Push changes
};
