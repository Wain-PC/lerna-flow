const exec = require('./exec');

module.exports = (type, tag) => {
    return exec(`lerna version pre${type} --no-push --no-git-tag-version --exact --yes --preid ${tag}`);
};
