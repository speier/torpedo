var fs = require('fs');
var path = require('path');
var visitor = require('./visitor');
var wrappers = require('browserify/lib/wrappers');

module.exports = {
  extensions: ['.js'],
  bundle: function(request, out, cb) {
    var self = this;
    var result = '';
    visitor.visit(request, function(r, fn, src, core) {
      result += self._body(r, src);
    }, function(r) {
      return require.resolve('browserify/builtins/' + r);
    }, function() {
      result = self._prepends(result);
      fs.writeFile(out, result, function(err) {
        if (err) throw err;
        cb();
      });
    });
  },
  _prepends: function(result) {
    var prelude = wrappers.prelude.replace(/\$extensions/, JSON.stringify(this.extensions));
    return prelude + '\n' + wrappers.process + '\n' + result;
  },
  _body: function(r, src) {
    return wrappers.body.replace(/\$__filename/, r).replace(/\$body/, src);
  }
};
