#!/usr/bin/env node

const yargs = require('yargs');
const askChoice = require('./tools/askChoice');

const run = async () => {
    // TODO: Use something smaller to parse args
    let [command] = yargs.argv._;

    if(!command || !['dev', 'prod'].includes(command)) {
        command = await askChoice('Select command', ['dev', 'prod'], 'dev');
    }

    const runner = require('./commands/' + command + '.js');
    await runner(args, yargs);

    console.log('Thanks, bye!');
};

run();

