const spawn = require("./spawn");

module.exports = prod => {
  const distTag = prod ? "" : "--dist-tag=dev";
  spawn(`lerna publish from-package ${distTag}`, { shell: true });
};
