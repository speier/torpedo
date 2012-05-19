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
      if (path.basename(fn) === 'package.json') {
        result += self._body(r, src, 'module.exports = ');
      } else {
        result += self._body(r, src);
      }
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
  _body: function(r, src, prefix) {
    src = src.replace(/^#![^\n]*\n/, '');
    //return 'require.define("' + r + '", function (require, module, exports, __dirname, __filename) {\n' + src + '\n});';

    return wrappers.body.replace(/\$__filename/g, function() {
      return JSON.stringify(r);
    }).replace(/\$body/, (prefix ? prefix + src : src));
  }
};
