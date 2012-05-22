var recess = require('recess');

module.exports = {
  compile: function(files, cb) {
    recess(files, {
      compile: true
    }, function(err, obj) {
      if (err) throw err;
      cb(obj.output.join('\n'));
    });
  }
};
