const tag = require("../tools/tag");
const ask = require("../tools/ask");

module.exports = async () => {
  if (await ask("Create new tag and push it?")) {
    await tag();
    console.log(
      "New tag pushed, now make your changes and try running this tool again."
    );
  }
};
