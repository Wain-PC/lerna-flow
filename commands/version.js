const askChoice = require('../tools/askString');
const ask = require('../tools/ask');
const bump = require('../tools/bump');

module.exports = async () => {
    const type = await askChoice('Bump type?', ['major', 'minor', 'patch'], 'minor');
    const push = await ask('Push updated packages to git?');
    await bump({type, push});
};
