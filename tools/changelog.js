const {promisify} = require('util');
const prependFile = promisify(require('prepend-file'));
const gitTask = require('./gitTask');

const getStableVersion = (version) => {
    const {major, minor, patch} = version;
    return `${major}.${minor}.${patch}`;
}

module.exports = async ({version, text = [], path = '', deps}) => {
    const taskId = await gitTask();
    const versionStr = getStableVersion(version);

    let markdown = `## v${versionStr}\n* [${taskId}](https://jr.avito.ru/browse/${taskId})\n`;

    for(const line of text) {
        if(line) {
            markdown += `* ${line}\n`;
        }
    }

    if(deps) {
        for(const {name, version} of deps) {
            markdown += `* Пакет ${name} обновлён до версии ${getStableVersion(version)}\n`;
        }
    }

    await prependFile(`${path}/CHANGELOG.md`, markdown);
    return markdown;
};
