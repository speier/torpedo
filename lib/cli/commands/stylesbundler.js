var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = {
  bundle: function(config, done) {
    var d = 0;
    var dict = {};
    config.styles.forEach(function(style) {
      var ext = path.extname(style).substring(1);
      if (!dict.hasOwnProperty(ext)) {
        dict[ext] = [];
        d++;
      }
      dict[ext].push(style);
    });
    var content = '';
    for (var k in dict) {
      d--;
      var plugin = require('../../../plugins/' + k);
      plugin.compile(dict[k], function(result) {
        content += result + '\n';
        if (d === 0) {
          mkdirp(path.dirname(config.output.css), function(err) {
            if (err) throw err;
            fs.writeFile(config.output.css, content, function(err) {
              if (err) throw err;
              done();
            });
          });
        }
      });
    }
  }
};
