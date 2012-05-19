var express = require('express');
var exhogan = require('./exhogan');

var app = require('./app');

var server = module.exports = express.createServer();

server.configure(function() {
  server.set('views', __dirname + '/views');
  server.register('mustache', exhogan);
  server.set('view engine', 'mustache');
  //server.set('view engine', 'jade');
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
