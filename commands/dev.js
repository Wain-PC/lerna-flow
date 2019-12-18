const bump = require('../tools/bump');
const publish = require('../tools/publish');
const push = require('../tools/push');
const ask = require('../tools/ask');
const askString = require('../tools/askString');
const askChoice = require('../tools/askChoice');
const changed = require('../tools/changed');
const gitTag = require('../tools/tag');

module.exports = async (args) => {
    const {versions, hasPrereleaseVersions, hasChangedPackages, preIds} = await changed();

    let tag = preIds[0] || '';

    if (hasChangedPackages) {
        console.log(versions.map(({name}) => name).join('\n'));
        const changedPackagesFine = await ask(`${versions.length} changed packages, is that OK?\n`);

        if (!changedPackagesFine) {
            if (await ask('Create new tag and push it?')) {
                await gitTag();
                console.log('New tag pushed, now make your changes and try running this tool again.');
            }
            return;
        }

        // If we have stable versions now, we should bump them to dev first
        if (hasPrereleaseVersions) {
            const push = await ask('Push to git after versions update?');
            await bump({type: 'prerelease', push, tag});
        } else {
            tag = await askString('Enter dev tag:', 'dev');
            const type = await askChoice('Bump type?', ['premajor', 'preminor', 'prepatch'], 'preminor');
            const push = await ask('Push updated packages to git?');
            await bump({type, tag, push});
        }
    }
    // Publish dev packages
    if (await ask(hasChangedPackages ? 'Publish packages to NPM?' : 'No changed packages found. You may try to publish already pushed packages to NPM.')) {
        await publish(tag);
    }

    // Level up till we find sibling projects, look at their dependencies.

    // Look at target branch. If it's not the same as main, create one with a same name.

    // If we updated one of their deps, install dev version there.

    // Push branch

    // Optionally, create a pull request in Jira.

    // Optionally, merge master into branch and automatically resolve package.json / package.lock deps.

};
