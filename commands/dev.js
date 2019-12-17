const versions = require('../tools/versions');
const bumpDev = require('../tools/bumpDev');
const bumpPrerelease = require('../tools/bumpPrerelease');
const publishDev = require('../tools/publishDev');
const commit = require('../tools/commit');
const ask = require('../tools/ask');

module.exports = async (args) => {
    const {type, tag} = args;
    const {versions, preIds, hasPrereleaseVersions} = await versions();

    // If we have stable versions now, we should bump them to dev first
    const question = hasPrereleaseVersions ? 'Bump prerelease versions' : 'Bump dev versions';
    if(!await ask(question)) {
        return;
    }
    if(hasPrereleaseVersions) {
        await bumpPrerelease(tag);
    } else {
        await bumpDev(type, tag);
    }
    // Publish dev packages
    if (await ask('Publish dev packages?')) {
        await publishDev();
    }

    //Retrieve branch task and commit with a default (potentially overridable) message
    if (await ask('Commit dev packages?')) {
        await commit();
    }

    //Push branch

    // Level up till we find sibling projects, look at their dependencies.

    // Look at target branch. If it's not the same as main, create one with a same name.

    // If we updated one of their deps, install dev version there.

    // Push branch

    // Optionally, create a pull request in Jira.

    // Optionally, merge master into branch and automatically resolve package.json / package.lock deps.

};
