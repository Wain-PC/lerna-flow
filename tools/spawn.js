const {promisify} = require('util');
const spawn = require('child_process').spawn;

module.exports = (commandString) => {
    const [command, ...args] = commandString.split(' ');
    console.log(command, args);
    const stream = spawn(command, args, {stdio: 'inherit'});
    return new Promise((resolve, reject) => {
        stream.on('close', resolve);
        stream.on('error', reject);
    })
};
