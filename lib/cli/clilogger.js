var colors = require('colors');
var growl = require('growl');
var logger = require('../logger');

function info(msg, notify) {
  var date = new Date().toFormat('HH24:MI:SS');
  console.log(date.data, 'info'.info + ':', msg);
  if (notify) {

  }
};

function error(msg) {
  console.error('error'.error + ':', msg);
  process.exit(1);
};

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
};

clilogger.notify = function(text, error) {
  growl(text, {
    title: 'Torpedo',
    image: error ? images.error : images.ok
  });
};
