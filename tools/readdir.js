const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

module.exports = readdir;
