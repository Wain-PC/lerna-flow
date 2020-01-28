const inquirer = require("inquirer");

module.exports = async (message, list, defaultChoice = "") => {
  const { question } = await inquirer.prompt([
    {
      type: "list",
      name: "question",
      message,
      choices: list,
      default: list.indexOf(defaultChoice)
    }
  ]);

  return question;
};
