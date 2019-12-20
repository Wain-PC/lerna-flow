const spawn = require('../tools/spawn');
const tag = require('../tools/spawn');
const askString = require('../tools/askString');

module.exports = async () => {
    const branch = await askString('This will pull the latest master & create new branch on top. Enter branch name:');
    await spawn(`git stash save`);
    await spawn(`git branch master`);
    await spawn(`git pull`);
    await spawn(`git branch -d ${branch}`);
    await spawn(`git stash apply --index`);
};
