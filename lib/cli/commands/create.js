var path = require('path');
var async = require('async');
var utils = require('../utils');
var logger = require('../clilogger');
var skeletons = require('../skeletons');

module.exports = function(name, skeleton) {
  skeleton = skeleton || skeletons.express;
  fs.exists(skeleton, function(exists) {
    if (!exists) skeleton = skeletons[skeleton];
    if (!skeleton) return logger.error('skeleton not found');
    utils.copy(skeleton, name, function(err) {
      if (err) return logger.error(err);
      updateProjectInfo(name);
    });
  });
};

function updateProjectInfo(name) {
  var basename = path.basename(name);
  async.parallel({
    package: function(cb) {
      utils.updateJson(path.join(name, 'package.json'), 'name', basename, cb);
    },
    readme: function(cb) {
      utils.updateFile(path.join(name, 'README.md'), /application-name/gi, basename, cb);
    }
  }, function(err) {
    if (err) logger.error(err);
    logger.info('new project created');
    logger.log('dont forget to install dependencies:');
    logger.log('$ cd %s && npm install', name);
    logger.log('then build your project:');
    logger.log('$ torpedo build');
  });
};