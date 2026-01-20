// utils/logger.js
const chalk = require("chalk");

function info(msg) {
  console.log(chalk.blue(msg));
}

function success(msg) {
  console.log(chalk.green(msg));
}

function warning(msg) {
  console.log(chalk.yellow(msg));
}

function error(msg) {
  console.log(chalk.red(msg));
}

function highlight(msg) {
  console.log(chalk.bgBlue.white.bold(msg));
}

module.exports = {
  info,
  success,
  warning,
  error,
  highlight,
};
