var fs = require('fs');
var path = require('path');
var Module = require('module');
var detective = require('detective');

var reqCount = 0;

// node-visitor
exports.visit = function(request, iterator, fallback, callback, parent) {
  var self = this;
  var fn, src, core;
  try {
    fn = require.resolve(request);
  } catch (err) {
    fn = Module._resolveFilename(request, parent);
  }
  path.exists(fn, function(exists) {
    if (!exists) {
      fn = fallback(request);
      core = true;
    }
    fs.readFile(fn, 'utf-8', function(err, src) {
      if (err) return;
      var r = request.replace(path.extname(request), '');
      iterator(r, fn, src, core);
      var requires = detective(src);
      reqCount += requires.length;
      requires.map(function(item) {
        self.visit(item, iterator, fallback, callback, {
          id: request,
          filename: fn
        });
      });
      reqCount--;
      if (reqCount < 0) {
        return callback();
      }
    });
  });
};
