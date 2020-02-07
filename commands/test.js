const updateSiblingRepositories = require("../tools/updateSiblingRepositories");

module.exports = () => {
  return updateSiblingRepositories({
    "@avito/geo-map": "0.16.0-pk.1.abcdef"
  });
};
