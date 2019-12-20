#!/usr/bin/env node
const askChoice = require('./tools/askChoice');
const readdir = require('./tools/readdir');
const {resolve} = require('path');

const run = async () => {
    let [command] = process.argv.slice(2);

    const commandsDir = resolve(__dirname, './commands');

    const commands = (await readdir(commandsDir)).map(file => file.slice(0, -3));

    if (!command || !commands.includes(command)) {
        command = await askChoice('Select command', commands, 'dev');
    }

    await require(resolve(commandsDir, command))();

    console.log('Thanks, bye!');
};

run();

