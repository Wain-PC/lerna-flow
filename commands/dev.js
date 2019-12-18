const bump = require('../tools/bump');
const publishDev = require('../tools/publishDev');
const push = require('../tools/push');
const ask = require('../tools/ask');
const changed = require('../tools/changed');

module.exports = async (args) => {
    const {type, tag} = args;

    const {versions, preIds, hasPrereleaseVersions} = await changed();

    const push = await ask('Push changes?');
    // If we have stable versions now, we should bump them to dev first
    if (hasPrereleaseVersions) {
        // TODO: ask for tag if ambigous
        if (await ask('Prerelease versions found, bump them?')) {
            await bump({type: 'prerelease', push});
        }
    } else {
        if (await ask('Bump dev versions?')) {
            await bump({type: 'pre' + type, tag, push});
        }
    }

    // Publish dev packages
    if (await ask('Publish packages?')) {
        await publishDev();
    }

    // Level up till we find sibling projects, look at their dependencies.

    // Look at target branch. If it's not the same as main, create one with a same name.

    // If we updated one of their deps, install dev version there.

    // Push branch

    // Optionally, create a pull request in Jira.

    // Optionally, merge master into branch and automatically resolve package.json / package.lock deps.

};
