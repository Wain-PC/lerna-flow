#!/usr/bin/env node
const { resolve } = require("path");
const askChoice = require("./tools/askChoice");
const getUncommitedFiles = require("./tools/uncommitedFiles");
const readdir = require("./tools/readdir");
const logger = require("./tools/logger");

const run = async () => {
  const uncommitedFiles = await getUncommitedFiles();
  if (uncommitedFiles.length) {
    logger.log(
      "Working tree has uncommitted changes, please commit or remove changes before continuing."
    );
    return;
  }

  let [command] = process.argv.slice(2);
  const commandsDir = resolve(__dirname, "./commands");

  const commands = (await readdir(commandsDir)).map(file => file.slice(0, -3));

  if (command && !commands.includes(command)) {
    logger.log(`Unknown command '${command}'!`);
  }

  if (!command || !commands.includes(command)) {
    command = await askChoice("Select command", commands, "dev");
  }

  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    await require(resolve(commandsDir, command))();
    logger.log("Thanks, bye!");
  } catch (err) {
    logger.error(
      `Something went terribly wrong. You can probably find additional info below:
      ${err}`
    );
  }
};

run();
