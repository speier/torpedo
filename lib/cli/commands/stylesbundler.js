var fs = require('fs');
var path = require('path');

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
          fs.writeFileSync(config.output.css, content);
          done();
        }
      });
    }
  }
};
