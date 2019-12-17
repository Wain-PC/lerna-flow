const inquirer = require('inquirer');

module.exports = async (message) => {
    const {question} = await inquirer.prompt([{
        type: 'confirm',
        name: 'question',
        message,
        default: true
    }]);

    return question;
};
