const getCurrentVersions = require('../tools/versions');
const bumpDev = require('../tools/bumpDev');
const bumpPrerelease = require('../tools/bumpPrerelease');
const publishDev = require('../tools/publishDev');
const push = require('../tools/push');
const ask = require('../tools/ask');
const changed = require('../tools/changed');

module.exports = async (args) => {
    const {type, tag} = args;

    const {versions, preIds, hasPrereleaseVersions} = await getCurrentVersions();

    const changedPackages = await changed();

    // If we have stable versions now, we should bump them to dev first
    if (hasPrereleaseVersions) {
        // TODO: ask for tag if ambigous
        if (await ask('Bump prerelease versions?')) {
            await bumpPrerelease();
        }
    } else {
        if (await ask('Bump dev versions?')) {
            await bumpDev(type, tag);
        }
    }

    // Publish dev packages
    if (await ask('Publish dev packages?')) {
        await publishDev();
    }

    //Push branch
    if (await ask('Push branch?')) {
        await push();
    }

    // Level up till we find sibling projects, look at their dependencies.

    // Look at target branch. If it's not the same as main, create one with a same name.

    // If we updated one of their deps, install dev version there.

    // Push branch

    // Optionally, create a pull request in Jira.

    // Optionally, merge master into branch and automatically resolve package.json / package.lock deps.

};
