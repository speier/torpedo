var fs = require('fs');
var path = require('path');
var logger = require('../clilogger');
var bundler = require('./bundler');

module.exports = function() {
  logger.info('Bulding...');
  var json = JSON.parse(fs.readFileSync('torpedo.json'));
  bundler.bundle(path.join(process.cwd(), json.app), json.output.js, function() {
    logger.info('Build done.');
  });
};
