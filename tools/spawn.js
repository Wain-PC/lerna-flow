const { command } = require("execa");
const logger = require("../tools/logger");

module.exports = (commandString, opts) => {
  logger.log(commandString);
  return command(commandString, {
    stdio: "inherit",
    preferLocal: true,
    ...opts
  });
};
