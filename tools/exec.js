const {promisify} = require('util');
const exec = promisify(require('child_process').exec);

module.exports = (command) => {
    console.log(command);
    return exec(command);
};
