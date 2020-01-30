const { promisify } = require("util");
const access = promisify(require("fs").access);
const path = require("path");

module.exports = async filePath => {
  try {
    await access(path.resolve(filePath, "lerna.json"));
    return true;
  } catch (err) {
    // do nothing
  }
  return false;
};
