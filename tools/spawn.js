const { command } = require("execa");
const logger = require("./logger");
const findProjectRoot = require("./findProjectRoot");

module.exports = async (commandString, opts) => {
  const root = await findProjectRoot();
  const options = {
    stdio: "inherit",
    preferLocal: true,
    cwd: root,
    ...opts
  };

  logger.log(commandString);
  return command(commandString, options);
};
