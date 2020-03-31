const spawn = require("./spawn");

module.exports = async prod => {
  const distTag = prod ? "" : "--dist-tag=dev";
  await spawn(`lerna publish from-package ${distTag}`, { shell: true });
};
