const { promisify } = require("util");
const prependFile = promisify(require("prepend-file"));
const gitTask = require("./gitTask");

module.exports = async ({ version, text = [], path = "", deps }) => {
  const taskId = await gitTask();

  // TODO: Dynamic markdown templates.
  let markdown = `## v${version.stable}\n* [${taskId}](https://jr.avito.ru/browse/${taskId})\n`;
  text.forEach(line => {
    markdown += `* ${line}\n`;
  });
  deps.forEach(({ name, version: depVersion }) => {
    markdown += `* Пакет \`${name}\` обновлён до версии \`${depVersion.stable}\`\n`;
  });
  markdown += "\n";

  await prependFile(`${path}/CHANGELOG.md`, markdown);
  return markdown;
};
