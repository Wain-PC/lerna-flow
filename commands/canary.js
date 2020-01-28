const canary = require('../tools/canary');
const askType = require('../tools/askType');
const askString = require('../tools/askString');

module.exports = async () => {
    const type = await askType();
    const preId = await askString('PreID tag?', 'dev');
    await canary(type, preId);
};
