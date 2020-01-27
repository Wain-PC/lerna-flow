const changedFromMaster = require('../tools/changedFromMaster');
const changedDependencies = require('../tools/changedDependencies');
const askString = require('../tools/askString');
const changelog = require('../tools/changelog');
const changed = require('../tools/changed');
const tag = require('../tools/tag');
const ask = require('../tools/ask');
const commit = require('../tools/commit');

module.exports = async () => {

    const {versions} = await changed();
    const list = await changedFromMaster();

    if (!list.length) {
        console.error('No changed packages found. Try commiting something.');
        return;
    }

    if (versions.length > list.length) {
        await tag();
    }

    console.log('Packages to produce CHANGELOGs for:');

    list.forEach(({name, containsChanges}) => console.log((containsChanges ? '* ' : '  ') + name));

    // Ask for CHANGELOG for each package.
    for (const {name, version, path, containsChanges, deps} of list) {
        const text = [];
        const depsList = changedDependencies(list, deps, name);
        if (containsChanges) {
            let string = '';
            let index = 0;
            do {
                index++;
                string = await askString(`Changelog for package ${name} (line ${index}):`);
                if (string) {
                    text.push(string);
                }
            } while (string);
        }
        // Update changelogs
        await changelog({path, text, version, deps: depsList});
    }

    // Commit changelogs
    if (await ask('Commit changelogs?')) {
        const taskId = await gitTask();
        const commitMessage = await askString('Commit message:', `${taskId} Updated CHANGELOGs`);
        await commit(commitMessage);
    }
};
