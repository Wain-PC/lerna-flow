const inquirer = require('inquirer');
const getFlags = require('./flags');

module.exports = async (message) => {
    const {yes} = getFlags();

    if (yes) {
        return true;
    }

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
