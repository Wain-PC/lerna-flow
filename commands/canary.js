const canary = require('../tools/canary');
const askChoice = require('../tools/askChoice');
const askString = require('../tools/askString');

module.exports = async () => {
    const type = await askChoice('Bump type?', ['major', 'minor', 'patch'], 'minor');
    const preId = await askString('PreID tag?', 'dev');
    await canary(type, preId);
};
