var fs = require('fs');
var path = require('path');
var history = require('./history');
var router = require('./router');
var toArray = require('express/lib/utils').toArray;

//var hogan = require('hogan.js');

var methods = router.methods.concat('del', 'all');

exports = module.exports = Application;
var app = Application.prototype;

function Application(options) {
  this.init(options);
};

app.settings = {};

app.init = function(options) {
  var self = this;
  this.history = new history(this);
  this.routes = new router(this);
  this.__defineGetter__('router', function() {
    this.__usedRouter = true;
    return self.routes.middleware;
  });
  this.enabled = function() {
    return false;
  };
};

app.set = function(setting, val) {
  if (val === undefined) {
    if (app.settings.hasOwnProperty(setting)) {
      return app.settings[setting];
    } else if (app.parent) {
      return app.parent.set(setting);
    }
  } else {
    app.settings[setting] = val;
    return app;
  }
};

/*app.bundler = function(bundle) {
  app._bundleVendor(bundle, app.set('vendor'));
  app._bundleViews(bundle, app.set('views'));
  app._bundleTemplates(bundle, app.set('templates') || (app.set('views') + '/templates'));
};

app._bundleVendor = function(bundle, vendor) {
  vendor.js.reverse();
  vendor.js.forEach(function(js) {
    var p = path.join(vendor.root, js);
    bundle.prepend(fs.readFileSync(p, 'utf-8'));
  });
};

app._bundleViews = function(bundle, dir) {
  if (typeof fs.readdirSync != 'undefined') {
    fs.readdirSync(dir).forEach(function(p) {
      p = path.join(dir, p);
      if (fs.statSync(p).isDirectory()) {
        app._bundleViews(bundle, p);
      } else if (p.match(/\.js$|\.coffee$/)) {
        var name = path.basename(path.relative(app.set('views'), p), path.extname(p));
        bundle.append('require.define("views/' + name + '", function (require, module, exports, __dirname, __filename) {\n' + fs.readFileSync(p, 'utf-8') + '\n});');
      }
    })
  }
};

app._bundleTemplates = function(bundle, dir) {
  if (typeof fs.readdirSync != 'undefined') {
    fs.readdirSync(dir).forEach(function(p) {
      p = path.join(dir, p);
      if (fs.statSync(p).isDirectory()) {
        app._bundleTemplates(bundle, p);
      } else if (path.extname(p) === '.' + app.set('view engine')) {
        var name = path.basename(path.relative(app.set('views'), p), path.extname(p));
        var content = hogan.compile(fs.readFileSync(p, 'utf-8'), {
          asString: true
        });
        var module = "module.exports = new Hogan.Template(" + content + ");";
        bundle.append('require.define("templates/' + name + '", function (require, module, exports, __dirname, __filename) {\n' + module + '\n});');
        bundle.prepend(fs.readFileSync(path.join(__dirname, '..', '..', 'node_modules', 'hogan.js', 'web', 'builds', '2.0.0', 'template-2.0.0.js')));
      }
    })
  }
};*/

methods.forEach(function(method) {
  app[method] = function(path) {
    if (1 == arguments.length) return this.routes.lookup(method, path);
    var args = [method].concat(toArray(arguments));
    return this.routes._route.apply(this.routes, args);
  }
});
