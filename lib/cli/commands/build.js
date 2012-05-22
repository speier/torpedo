var fs = require('fs');
var path = require('path');
var logger = require('../clilogger');
var bundler = require('./bundler');
var stylesbundler = require('./stylesbundler');

module.exports = function() {
  var cfg = 'torpedo.json';
  if (!path.existsSync(cfg)) {
    return logger.error('Config file not found.');
  }
  var json = JSON.parse(fs.readFileSync(cfg));
  logger.info('Bulding...');
  bundler.bundle(json, function() {
    stylesbundler.bundle(json, function() {
      logger.info('Build done.');
    });
  });
};
