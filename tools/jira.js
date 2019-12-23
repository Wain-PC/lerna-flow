const exec = require('./exec');

module.exports = async () => {
    try {
        const {stdout} = await exec('git remote -v');
        const regExp = /([\w-]+)@([\w-.]+):(\d+?)?\/([\w-]+)\/([\w-]+)\.git/;
        const [fullMatch, user, host, port, project, repository] = regExp.exec(stdout);

        return {
            remote: fullMatch,
            repositoryUrl: `http://${host}/projects/${project}/repos/${repository}`
        }
    } catch (err) {
        return {
            remote: '',
            repositoryUrl: ''
        };
    }
};
