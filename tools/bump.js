const spawn = require('./spawn');
const askString = require('./askString');

module.exports = async ({type, tag, push}) => {
    const commitMessage = await askString('Commit message', 'Bump dev package versions');

    return spawn(`lerna version ${type} ${push ? '' : '--no-push'} -m "${commitMessage}" --exact ${tag ? `--preid ${tag}` : ''}`);


};
