const { command } = require("execa");
const logger = require("./logger");

module.exports = (commandString, opts) => {
  logger.log(commandString);
  return command(commandString, {
    stdio: "inherit",
    preferLocal: true,
    ...opts
  });
};
