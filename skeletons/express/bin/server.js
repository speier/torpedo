var http = require('http');
var up = require('up');

var master = http.createServer().listen(process.env.PORT || 3000);
var srv = up(master, __dirname + '/../server');

process.on('SIGUSR2', function() {
  srv.reload();
});
