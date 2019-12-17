const gitTask = require('./gitTask');

module.exports = async ({repo = '', version = '', text =''}) => {
    const taskId = await gitTask();

    return `## v${version}
* [${taskId}](https://jr.avito.ru/browse/${taskId})
* ${text}

`;
};
