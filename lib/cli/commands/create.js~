var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var logger = require('../clilogger');
var skeletons = require('../skeletons');

module.exports = function(name, skeleton) {
  if (!skeleton) {
    skeleton = skeletons.express;
  }
  if (!path.existsSync(skeleton)) {
    skeleton = skeletons[skeleton];
  }
  if (!skeleton) {
    return logger.error('invalid skeleton');
  }
  mkdirp(name, function(err) {
    if (err) {
      return logger.error(err);
    } else {
      ncp(skeleton, name, function(err) {
        if (err) {
          return logger.error(err);
        }
        updateProjectInfo(name);
      });
    }
  });
};

function updateProjectInfo(name) {
  // update package.json ..
  var pkg = JSON.parse(fs.readFileSync(path.join(name, 'package.json')));
  pkg.name = path.basename(name);
  fs.writeFileSync(path.join(name, 'package.json'), JSON.stringify(pkg, null, 2));
  // update readme.md ..
  var readme = fs.readFileSync(path.join(name, 'readme.md'), 'utf-8');
  readme = readme.replace(/application-name/gi, pkg.name);
  fs.writeFileSync(path.join(name, 'readme.md'), readme);
  // log info ..
  logger.info('new project created');
  logger.info('dont forget to install dependencies:');
  logger.info('$ cd ' + name + ' && npm install');
};
