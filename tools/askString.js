const inquirer = require('inquirer');

module.exports = async (message, defaultMessage = '') => {
    const {question} = await inquirer.prompt([{
        type: 'string',
        name: 'question',
        message,
        default: defaultMessage
    }]);

    return question;
};
