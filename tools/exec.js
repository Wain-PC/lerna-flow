const { command } = require("execa");
const findProjectRoot = require("./findProjectRoot");

module.exports = async (commandStr, opts) => {
  const root = await findProjectRoot();
  const options = {
    preferLocal: true,
    cwd: root,
    ...opts
  };
  return command(commandStr, options);
};
