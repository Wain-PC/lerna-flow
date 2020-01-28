const parseVersion = require("./parseVersion");

module.exports = (list, deps, packageName) => {
  const output = [];
  Object.values(list).reduce((acc, { name }) => {
    if (name !== packageName) {
      Object.keys(deps).forEach(dep => {
        if (dep === name) {
          acc.push({
            name: dep,
            version: parseVersion(deps[dep])
          });
        }
      });
    }

    return acc;
  }, []);

  return output;
};
