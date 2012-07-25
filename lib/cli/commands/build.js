var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var logger = require('../clilogger');
var bundler = require('./bundler');
var stylesbundler = require('./stylesbundler');

module.exports = function() {
  var cfg = 'torpedo.json';
  if (!fs.existsSync(cfg)) {
    return logger.error('Config file not found.');
  }
  var json = JSON.parse(fs.readFileSync(cfg));
  logger.log('Bulding...');
  bundler.bundle(json, function() {
    stylesbundler.bundle(json.vendor.css, function(vendorcss) {
      stylesbundler.bundle(json.styles, function(stylescss) {
        mkdirp(path.dirname(json.output.css), function(err) {
          if (err) throw err;
          fs.writeFile(json.output.css, vendorcss + '\n' + stylescss, function(err) {
            if (err) throw err;
            logger.info('Build done.');
          });
        });
      });
    });
  });
};
