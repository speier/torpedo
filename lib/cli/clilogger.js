var util = require('util');
var colors = require('colors');
var growl = require('growl');
var logger = require('../logger');

module.exports = clilogger = Object.create(logger);

var images = {
  ok: __dirname + '/images/ok.png',
  error: __dirname + '/images/error.png'
};

colors.setTheme({
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

clilogger.log = function() {
  var text = util.format.apply(this, arguments);
  this.__proto__.debug.apply(this, [text.data]);
};

clilogger.debug = function() {
  var text = util.format.apply(this, arguments);
  this.__proto__.debug.apply(this, [text.debug]);
};

clilogger.info = function() {
  var text = util.format.apply(this, arguments);
  this.__proto__.info.apply(this, [text.info]);
  this.notify(text, images.ok);
};

clilogger.error = function() {
  var text = util.format.apply(this, arguments);
  this.__proto__.error.apply(this, [text.error]);
  this.notify(text, images.error);
  process.exit(1);
};

clilogger.notify = function(text, image) {
  growl(text, {
    title: 'Torpedo',
    image: image
  });
};
