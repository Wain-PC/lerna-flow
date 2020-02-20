const publish = require("../tools/publish");
const ask = require("../tools/ask");

module.exports = async () => {
  const prod = await ask("Publish PROD packages?");
  await publish(prod);
};
