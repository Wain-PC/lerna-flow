const spawn = require("./spawn");

module.exports = () => spawn("lerna publish from-package", { shell: true });
