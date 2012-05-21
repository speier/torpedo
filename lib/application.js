var fs = require('fs');
var path = require('path');
var history = require('./history');
var router = require('./router');
var toArray = require('express/lib/utils').toArray;

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

methods.forEach(function(method) {
  app[method] = function(path) {
    if (1 == arguments.length) return this.routes.lookup(method, path);
    var args = [method].concat(toArray(arguments));
    return this.routes._route.apply(this.routes, args);
  }
});
