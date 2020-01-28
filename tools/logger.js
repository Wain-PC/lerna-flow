const chalk = require("chalk");

const log = level => message => {
  let style = chalk.bold;
  switch (level) {
    case "warn": {
      style = style.orange;
      break;
    }
    case "error": {
      style = style.red;
      break;
    }
    default: {
      style = chalk.bold;
    }
  }
  // eslint-disable-next-line no-console
  console[level](style(message));
};

const logger = new Proxy(
  {},
  {
    get: (target, prop) => log(prop)
  }
);

module.exports = logger;
