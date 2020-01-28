#!/usr/bin/env node
const { resolve } = require("path");
const askChoice = require("./tools/askChoice");
const getUncommitedFiles = require("./tools/uncommitedFiles");
const readdir = require("./tools/readdir");

const run = async () => {
  const uncommitedFiles = await getUncommitedFiles();
  if (uncommitedFiles.length) {
    console.log(
      "Working tree has uncommitted changes, please commit or remove changes before continuing."
    );
    return;
  }

  let [command] = process.argv.slice(2);
  const commandsDir = resolve(__dirname, "./commands");

  const commands = (await readdir(commandsDir)).map(file => file.slice(0, -3));

  if (command && !commands.includes(command)) {
    console.log(`Unknown command '${command}'!`);
  }

  if (!command || !commands.includes(command)) {
    command = await askChoice("Select command", commands, "dev");
  }

  // eslint-disable-next-line global-require,import/no-dynamic-require
  await require(resolve(commandsDir, command))();

  console.log("Thanks, bye!");
};

run();
