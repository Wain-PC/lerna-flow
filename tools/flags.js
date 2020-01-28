module.exports = () => {
  const args = process.argv.slice(2);
  const flagRe = /--[a-z]+/;
  return args
    .filter(arg => flagRe.test(arg))
    .map(arg => arg.slice(2))
    .reduce((acc, arg) => {
      acc[arg] = true;
      return acc;
    }, {});
};
