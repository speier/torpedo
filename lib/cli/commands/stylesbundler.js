var fs = require('fs');
var path = require('path');

module.exports = {
  bundle: function(styles, done) {
    var d = 0;
    var dict = {};
    styles.forEach(function(style) {
      var ext = path.extname(style).substring(1);
      if (!dict.hasOwnProperty(ext)) {
        dict[ext] = [];
        d++;
      }
      dict[ext].push(style);
    });
    var content = '';
    for (var k in dict) {
      var plugin = require('../../../plugins/' + k);
      plugin.compile(dict[k], function(result) {
        content += result + '\n';
        d--;
        if (d === 0) {
          return done(content);
        }
      });
    }
  }
};
