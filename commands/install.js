const Clipboard = require("clipboardy");
const ask = require("../tools/ask");
const publishedPackages = require("../tools/publishedPackages");

module.exports = async () => {
  const packages = await publishedPackages();

  if (packages.length) {
    const line = `npm install ${packages.join(" ")}`;
    console.log(line);
    if (await ask("Copy install line to clipboard?")) {
      await Clipboard.write(line);
    }
  }

  console.log("Unable to determine published packages");
};
