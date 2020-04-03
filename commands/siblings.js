const ask = require("../tools/ask");
const update = require("../tools/updateSiblingRepositories");

module.exports = async () => {
  if (await ask("Wanna update siblings?")) {
    await update();
    return true;
  }
  return false;
};
