const Clipboard = require("clipboardy");
const ask = require("../tools/ask");
const publishedPackages = require("../tools/publishedPackages");
const logger = require("../tools/logger");

module.exports = async () => {
  const packages = await publishedPackages();

  if (packages.length) {
    const line = `npm install ${packages.join(" ")}`;
    logger.log(line);
    if (await ask("Copy install line to clipboard?")) {
      await Clipboard.write(line);
    }
  }

  logger.log("Unable to determine published packages");
};
