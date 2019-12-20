const spawn = require('../tools/spawn');

module.exports = async (branchName) => {
    if (!branchName) {
        return;
    }

    try {
        await spawn(`git stash save`);
    } catch (err) {
        // Do nothing
    }

    try {
        await spawn(`git checkout master`);
    } catch (err) {
        await spawn(`git checkout -b master`);
    }

    await spawn(`git pull`);

    try {
        await spawn(`git checkout -b ${branchName}`);
    } catch (err) {
        // do nothing
    }

    await spawn(`git stash apply --index`);

};
