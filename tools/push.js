const exec = require('./exec');

module.exports = async () => {
    await exec(`git push origin`);
};
