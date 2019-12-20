const exec = require('./exec');

module.exports = async () => {
    try {
        const {stdout} = await exec('git remote -v');
        const regExp = /(\w+)@([\w.]+):(\d+?)?\/(\w+)\/(\w+)\.git/;
        console.log('SRD:', regExp.exec(stdout));
        const [fullMatch, user, host, port, project, repository] = regExp.exec(stdout);

        return {
            remote: fullMatch,
            repositoryUrl: `http://${host}/projects/${project}/repos/${repository}`,
            user, host, port, project, repository
        }
    } catch (err) {
        // Do nothing. Probably a fail message?
    }
};
