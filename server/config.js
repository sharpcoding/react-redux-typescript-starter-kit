var argv = require('yargs').default('production', false).argv;

module.exports = {
  port: process.env.PORT || 8000
};