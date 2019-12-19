#!/usr/bin/env node
const askChoice = require('./tools/askChoice');

const run = async () => {
    let [command] = process.argv.slice(2);


    if(!command || !['dev', 'prod'].includes(command)) {
        command = await askChoice('Select command', ['dev', 'prod'], 'dev');
    }

    const runner = require('./commands/' + command + '.js');
    await runner();

    console.log('Thanks, bye!');
};

run();

