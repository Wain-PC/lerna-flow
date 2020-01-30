const path = require("path");
const hasLerna = require("./hasLerna");

module.exports = async () => {
  // Find root (that's where lerna.json is located)
  const MAX_STEPS_DOWN = 5;

  let executionFolder = process.cwd();
  let lernaFound = false;

  for (let i = 0; i < MAX_STEPS_DOWN; i += 1) {
    if (await hasLerna(executionFolder)) {
      lernaFound = true;
      break;
    }

    executionFolder = path.resolve(executionFolder, "..");
  }

  if (!lernaFound) {
    throw new Error(
      "Cannot find lerna root from where you are. Try running this command from directory with lerna.json"
    );
  }

  return executionFolder;
};
