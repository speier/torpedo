var express = require('express');
var app = require('./app');

var server = module.exports = express.createServer();

server.configure(function() {
  server.register('html', require('torpedo/plugins/hogan'));
  server.set('view engine', 'html');
  server.set('views', __dirname + '/views/templates');
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(app.router);
  server.use(express.static(__dirname + '/public'));
});

server.configure('development', function() {
  server.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

server.configure('production', function() {
  server.use(express.errorHandler());
});
