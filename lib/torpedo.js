var Application = require('./application');

exports.version = require(__dirname + '/../package').version;

exports.createApp = function(options) {
  if ('object' == typeof options) {
    return new Application(options, Array.prototype.slice.call(arguments, 1));
  } else {
    return new Application(Array.prototype.slice.call(arguments));
  }
}
