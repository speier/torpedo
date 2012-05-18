var logger = require('../clilogger');
var bundler = require('./bundler');

module.exports = function(file) {
  var out = 'public/js/torpedo.js';
  logger.info('Bulding ...');
  bundler.bundle(file, out, function() {
    logger.info('Build done.');
  });
};
