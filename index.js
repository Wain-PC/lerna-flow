#!/usr/bin/env node

const yargs = require('yargs');

const run = async () => {
    const args = yargs
        .command('dev [type]', 'update DEV packages', (yargs) => {
            yargs.positional('type', {
                describe: 'one of: major, minor, patch',
                type: 'string',
                default: 'minor'
            })
        })
        .help()
        .argv;

    console.log(args);

    const [command] = args._;

    try {
        const runner = require('./commands/' + command + '.js');
        await runner(args, yargs);
    } catch (err) {
        console.error(err);
        console.log('Unknown command! Please take a look:\n');
        yargs.showHelp();
    }
};

run();

