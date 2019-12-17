const gitBranch = require('./gitBranch.js');

module.exports = async () => {
    const branch = await gitBranch();
    const taskRegExp = /^([A-Z]+-\d+)/;
    const result = taskRegExp.exec(branch);
    if(!(result && result[0])) {
        return null;
    }
    return result[0];
};
