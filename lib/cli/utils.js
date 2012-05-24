var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var async = require('async');

exports.copy = function(source, destination, callback) {
  async.auto({
    make_folder: function(cb) {
      // create destionation folder if not exists
      mkdirp(destination, cb);
    },
    copy_files: ['make_folder', function(cb) {
      // copy all files and dirs recursively if folder exists
      ncp(source, destination, cb);
    }]
  }, callback); // all tasks have been completed
};

exports.updateFile = function(filename, searchvalue, newvalue, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) return callback(err);
    data = data.replace(searchvalue, newvalue);
    fs.writeFile(filename, data, function(err) {
      return err ? callback(err) : callback(null);
    });
  });
};

exports.updateJson = function(filename, property, value, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) return callback(err);
    var json = JSON.parse(data);
    json[property] = value;
    fs.writeFile(filename, JSON.stringify(json, null, 2), function(err) {
      return err ? callback(err) : callback(null);
    });
  });
};