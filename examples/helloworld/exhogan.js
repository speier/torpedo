var hogan = require('hogan.js');

exports.compile = function() {
  var t = hogan.compile.apply(hogan, arguments);
  return function() {
    return t.render.apply(t, arguments);
  }
}
