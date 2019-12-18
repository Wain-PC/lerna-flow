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

    const [command] = args._;
    const runner = require('./commands/' + command + '.js');
    await runner(args, yargs);
};

run();

