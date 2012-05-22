module.exports = {
  log: function() {
    this.write('log', arguments);
  },
  debug: function() {
    this.write('log', arguments);
  },
  info: function() {
    this.write('info', arguments);
  },
  warn: function() {
    this.write('warn', arguments);
  },
  error: function() {
    this.write('error', arguments);
  },
  write: function(type, arguments) {
    var time = new Date().toLocaleTimeString();
    Array.prototype.splice.call(arguments, 0, 0, time);
    Array.prototype.splice.call(arguments, 1, 0, type);
    this.toConsole(arguments);
  },
  toConsole: function(arguments) {
    if (typeof(console) == 'undefined') return;
    var method = Array.prototype.splice.call(arguments, 1, 1)[0];
    var args = Array.prototype.slice.call(arguments, 0);
    try {
      console[method].apply(console, args);
    } catch (e) {
      console[method](args);
    }
  }
};

// make it safe to do console.log() always
if (typeof(window) != 'undefined') {
  (function(con) {
    var method;
    var dummy = function() {};
    var methods = ('assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn').split(',');
    while (method = methods.pop()) {
      con[method] = con[method] || dummy;
    }
  })(window.console = window.console || {});
};