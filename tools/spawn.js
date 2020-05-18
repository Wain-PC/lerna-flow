const { command } = require("execa");
const logger = require("./logger");

module.exports = async (commandString, opts) => {
  const options = {
    stdio: "inherit",
    preferLocal: true,
    ...opts
  };

  logger.log(commandString);
  return command(commandString, options);
};
