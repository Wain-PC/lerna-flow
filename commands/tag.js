const tag = require("../tools/tag");
const ask = require("../tools/ask");
const logger = require("../tools/logger");

module.exports = async () => {
  if (await ask("Create new tag and push it?")) {
    await tag();
    logger.log(
      "New tag pushed, now make your changes and try running this tool again."
    );
  }
};
