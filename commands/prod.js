const changedFromMaster = require('../tools/changedFromMaster');
const ask = require('../tools/ask');
const askString = require('../tools/askString');
const changelog = require('../tools/changelog');
const changedDependencies = require('../tools/changedDependencies');
const commit = require('../tools/commit');
const bump = require('../tools/bump');
const publish = require('../tools/publish');
const gitTask = require('../tools/gitTask');
const getUncommitedFiles = require('../tools/uncommitedFiles');
const installCommand = require('./install');

module.exports = async () => {
    const uncommitedFiles = await getUncommitedFiles();
    if(uncommitedFiles.length) {
        console.log('Working tree has uncommitted changes, please commit or remove changes before continuing.');
        return;
    }

    // Find packages with prerelease tag
    const list = await changedFromMaster();
    const hasChangedPackages = list.length;

    if(hasChangedPackages) {
        console.log(list.map(({name}) => name).join('\n'));

        const changedPackagesFine = await ask(`Going to publish ${list.length} packages, is that OK?\n`);
        if (!changedPackagesFine) {
            return;
        }

        if (await ask('Update changelogs?')) {
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

        }
    }

    // Bump packages to stable
    const push = await ask('Push to git after versions update?');
    await bump({push, type: 'patch'});

    // Publish stable packages
    if (await ask(hasChangedPackages ? 'Publish STABLE packages to NPM?' : 'No changed packages found. You may try to publish already pushed packages to NPM.')) {
        await publish(true);
        if (await ask('Prepare NPM install line?')) {
            await installCommand();
        }
    }
};
