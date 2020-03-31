const { command } = require("execa");

module.exports = (commandStr, opts) =>
  command(commandStr, { preferLocal: true, ...opts });
