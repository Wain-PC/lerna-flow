const {command} = require('execa');

module.exports = (commandStr) => command(commandStr, {preferLocal: true});
