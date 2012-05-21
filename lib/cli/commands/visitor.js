/*!
 * reqvisitor
 * Copyright (c) 2012 Kalman Speier <kalman.speier@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var Module = require('module');
var detective = require('detective');

/**
 * Recursively walks through all require calls from the definied entry point `request`
 * then trying to resolve the filename and read the file contents then calling the `iterator` callback function
 * if unable to resolve the filename it will call the `fallback` callback function where you can return your own filename
 * finally it will will call the `done` callback function when iterated over all require call found.
 *
 * @param {Stirng} request
 * @param {Function} iterator
 * @param {Function} fallback
 * @param {Function} callback
 * @param {String} parent
 * @api public
 */

exports.visit = function(request, iterator, done, fallback, parent) {
  var self = this;
  var fn, src, core;
  try {
    fn = require.resolve(request);
  } catch (err) {
    fn = Module._resolveFilename(request, parent);
  }
  if (path.extname(fn) === '.json' && path.basename(fn) != 'package.json') {
    return self.visit(request, iterator, done, fallback, {
      id: request,
      filename: fn,
      paths: [path.join(process.cwd(), 'node_modules')]
    });
  }
  path.exists(fn, function(exists) {
    if (!exists) {
      fn = fallback(request);
      core = true;
    }
    fs.readFile(fn, 'utf8', function(err, src) {
      if (err) return;
      var r = request.replace(path.extname(request), '');
      iterator(r, fn, src, core);
      var requires = detective(src);
      reqCount += requires.length;
      requires.map(function(item) {
        var p = path.dirname(fn);
        self.visit(item, iterator, done, fallback, {
          id: request,
          filename: fn,
          paths: [p, path.join(p, 'node_modules')]
        });
      });
      reqCount--;
      if (reqCount < 0) {
        return done();
      }
    });
  });
};

var reqCount = 0;
