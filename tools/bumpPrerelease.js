const exec = require('./exec');

module.exports = async (tag) => {
    await exec(`lerna version prerelease --no-push --exact --yes`);
};
