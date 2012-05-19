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

clilogger.info = function() {
  var text = Array.prototype.slice.call(arguments).join(' ');
  this.__proto__.info.apply(this, [text.info]);
  this.notify(text);
};

clilogger.error = function() {
  var text = Array.prototype.slice.call(arguments).join(' ');
  this.__proto__.error.apply(this, [text.error]);
  this.notify(text, true);
  process.exit(1);
};

clilogger.notify = function(text, error) {
  growl(text, {
    title: 'Torpedo',
    image: error ? images.error : images.ok
  });
};
