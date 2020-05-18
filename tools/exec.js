const { command } = require("execa");

module.exports = async (commandStr, opts) => {
  const options = {
    preferLocal: true,
    ...opts
  };
  return command(commandStr, options);
};
