const askType = require('../tools/askType');
const ask = require('../tools/ask');
const bump = require('../tools/bump');

module.exports = async () => {
    const type = await askType();
    const push = await ask('Push updated packages to git?');
    await bump({type, push});
};
