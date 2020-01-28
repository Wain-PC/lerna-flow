const inquirer = require("inquirer");
const getFlags = require("./flags");

module.exports = async (message, defaultMessage = "") => {
  const { yes } = getFlags();

  if (defaultMessage && yes) {
    return defaultMessage;
  }

  const { question } = await inquirer.prompt([
    {
      type: "string",
      name: "question",
      message,
      default: defaultMessage
    }
  ]);

  return question;
};
