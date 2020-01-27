const canary = require('../tools/canary');
const installCommand = require('./install');

module.exports = async () => {
    await canary();
};
