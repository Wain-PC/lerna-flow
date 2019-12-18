const inquirer = require('inquirer');

module.exports = async (message) => {
    const {question} = await inquirer.prompt([{
        type: 'expand',
        name: 'question',
        message,
        choices: [
            {
                key: 'y',
                name: 'Yes',
                value: true
            },
            {
                key: 'n',
                name: 'No',
                value: false
            },
        ],
        default: 0 // true is selected by default
    }]);

    return question;
};
