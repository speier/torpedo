var express = require('express');
var cons = require('consolidate');
var app = require('./app');

var server = module.exports = express.createServer();

server.configure(function() {
  server.register('html', cons.hogan);
  server.set('view engine', 'html');
  server.set('views', __dirname + '/views');
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
