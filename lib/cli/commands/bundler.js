var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var visitor = require('./visitor');
var wrappers = require('browserify/lib/wrappers');

module.exports = {
  extensions: ['.js'],
  bundle: function(config, done) {
    var self = this;
    var request = path.join(process.cwd(), config.main);
    var result = '';
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
        result = result.replace(/^#![^\n]*\n/, '');
      }
    }, function() {
      result = self._prepends(config, result);
      result = self._append(config, result);
      result = result + '\n' + entry;
      mkdirp(path.dirname(config.output.js), function(err) {
        if (err) throw err;
        fs.writeFile(config.output.js, result, function(err) {
          if (err) throw err;
          done();
        });
      });
    }, function(r) {
      return require.resolve('browserify/builtins/' + r);
    });
  },
  _prepends: function(config, result) {
    var vendor = '';
    config.vendor.js.forEach(function(vjs) {
      var vjsp = path.join(process.cwd(), vjs);
      vendor += fs.readFileSync(vjsp, 'utf-8') + '\n';
    });
    var tpleng = require('../../../plugins/' + config.templates.engine);
    if (typeof(tpleng.vendor) != 'undefined') {
      tpleng.vendor().forEach(function(v) {
        vendor += fs.readFileSync(v, 'utf-8') + '\n';
      });
    }
    var bp = fs.readFileSync(require.resolve('browserify/builtins/path'), 'utf8');
    var prelude = wrappers.prelude.replace(/\$extensions/, JSON.stringify(this.extensions));
    return vendor + '\n' + prelude + '\n' + wrappers.process + '\n' + this._wrap('body', 'path', bp) + '\n' + result;
  },
  _entry: function(r, src) {
    return this._wrap('entry', r, src);
  },
  _body: function(r, src, prefix) {
    return this._wrap('body', r, src, prefix);
  },
  _wrap: function(wrapper, r, src, prefix) {
    src = (prefix ? prefix + src : src);
    src = src.replace(/\$/g, '$$$');
    return wrappers[wrapper].replace(/\$__filename/g, function() {
      return JSON.stringify(r);
    }).replace(/\$body/, src);
  },
  _append: function(config, result) {
    // views
    result = this._bundleViews(path.join(process.cwd(), config.views), result);
    // templates
    result = this._bundleTemplates(path.join(process.cwd(), config.templates.dir), config, result);
    return result;
  },
  _bundleViews: function(dir, result) {
    var self = this;
    fs.readdirSync(dir).forEach(function(p) {
      p = path.join(dir, p);
      if (fs.statSync(p).isDirectory()) {
        self._bundleViews(p, result);
      } else if (p.match(/\.js$|\.coffee$/)) {
        var name = path.basename(path.relative(dir, p), path.extname(p));
        var view = fs.readFileSync(p, 'utf-8');
        result += self._body('views/' + name, view);
      }
    });
    return result;
  },
  _bundleTemplates: function(dir, config, result) {
    var self = this;
    var tpleng = require('../../../plugins/' + config.templates.engine);
    fs.readdirSync(dir).forEach(function(p) {
      p = path.join(dir, p);
      if (fs.statSync(p).isDirectory()) {
        self._bundleTemplates(p, config, result);
      } else {
        var ext = (config.templates.ext[0] != '.') ? '.' + config.templates.ext : config.templates.ext;
        if (path.extname(p) === ext) {
          var name = path.basename(path.relative(dir, p), path.extname(p));
          var tpl = fs.readFileSync(p, 'utf-8');
          var content = tpleng.bundle(tpl);
          result += self._body('templates/' + name, content);
        }
      }
    });
    return result;
  }
};
