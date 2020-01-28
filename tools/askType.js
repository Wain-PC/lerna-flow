const askChoice = require("./askChoice");

module.exports = () =>
  askChoice("Bump type?", ["major", "minor", "patch"], "minor");
