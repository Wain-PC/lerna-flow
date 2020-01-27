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

    // TODO: Better comparison
    if (list.length !== versions.length) {
        await tag();
    }

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
