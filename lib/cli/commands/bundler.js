var fs = require('fs');
var path = require('path');
var visitor = require('./visitor');
var wrappers = require('browserify/lib/wrappers');

module.exports = {
  extensions: ['.js'],
  bundle: function(request, out, cb) {
    var self = this;
    var result ='';
    var entry = '';
    visitor.visit(request, function(r, fn, src, core) {
      if (r === 'path') {
        return;
      } else if (r === request) {
        entry += self._entry(path.basename(r), src);
      } else if (path.extname(fn) === '.json') {
        result += self._body(r, src, 'module.exports = ');
      } else {
        result += self._body(r, src);
      }
    }, function() {
      result = self._prepends(result);
      result = result + '\n' + entry;
      fs.writeFile(out, result, function(err) {
        if (err) throw err;
        cb();
      });
    }, function(r) {
      return require.resolve('browserify/builtins/' + r);
    });
  },
  _prepends: function(result) {
    var path = fs.readFileSync(require.resolve('browserify/builtins/path'), 'utf8');
    var prelude = wrappers.prelude.replace(/\$extensions/, JSON.stringify(this.extensions));
    return prelude + '\n' + wrappers.process + '\n' + this._wrap('body', 'path', path) + '\n' + result;
  },
  _entry: function(r, src) {
    return this._wrap('entry', r, src);
  },
  _body: function(r, src, prefix) {
    return this._wrap('body', r, src, prefix);
  },
  _wrap: function(wrapper, r, src, prefix) {
    src = (prefix ? prefix + src : src);
    src = src.replace(/^#![^\n]*\n/, '');
    src = src.replace(/\$/g, '$$$');
    return wrappers[wrapper].replace(/\$__filename/g, function() {
      return JSON.stringify(r);
    }).replace(/\$body/, src);
  }
};
