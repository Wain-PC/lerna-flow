const {promisify} = require('util');
const prependFile = promisify(require('prepend-file'));
const gitTask = require('./gitTask');

module.exports = async ({version, text = [], path = '', deps}) => {
    const taskId = await gitTask();

    let markdown = `## v${version.stable}\n* [${taskId}](https://jr.avito.ru/browse/${taskId})\n`;

    for(const line of text) {
        if(line) {
            markdown += `* ${line}\n`;
        }
    }

    if(deps) {
        for(const {name, version} of deps) {
            markdown += `* Пакет ${name} обновлён до версии ${version.stable}\n`;
        }
    }

    await prependFile(`${path}/CHANGELOG.md`, markdown);
    return markdown;
};
