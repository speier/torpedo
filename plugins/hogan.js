var path = require('path');
var hogan = require('hogan.js');

module.exports = {
  type: 'template',
  compile: function(str, options) {
    var tmpl = hogan.compile.apply(hogan, arguments);
    return function() {
      return tmpl.render.apply(tmpl, arguments);
    };
  },
  include: function() {
    return [path.join(require.resolve('hogan.js'), 'web', 'builds', '2.0.0', 'template-2.0.0.js')];
  }
};
