const {promisify} = require('util');
const spawn = require('child_process').spawn;

module.exports = (commandString, opts) => {
    console.log(commandString);
    const [command, ...args] = commandString.split(' ');
    const stream = spawn(command, args, {stdio: 'inherit', ...opts});
    return new Promise((resolve, reject) => {
        stream.on('close', resolve);
        stream.on('error', reject);
    })
};
