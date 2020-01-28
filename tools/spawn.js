const { command } = require("execa");

module.exports = (commandString, opts) => {
  console.log(commandString);
  return command(commandString, {
    stdio: "inherit",
    preferLocal: true,
    ...opts
  });
};
