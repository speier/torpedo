var path = require('path');
var hogan = require('hogan.js');

module.exports = {
  compile: function(str, options) {
    var tmpl = hogan.compile.apply(hogan, arguments);
    return function() {
      return tmpl.render.apply(tmpl, arguments);
    };
  },
  bundle: function(str) {
    var content = hogan.compile(str, {
      asString: true
    });
    return "module.exports = new Hogan.Template(" + content + ");";
  },
  vendor: function() {
    return [path.join(__dirname, '..', 'node_modules', 'hogan.js', 'web', 'builds', '2.0.0', 'template-2.0.0.js')];
  }
};
