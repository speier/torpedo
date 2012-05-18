exports = module.exports = History;
var history = History.prototype;

function History(app) {
  this.init(app);
};

history.matchRoute = function() {
  var req = {
    method: 'get',
    url: window.location.pathname
  };
  var res = {
    send: function(body) {
      window.document.body.innerHTML = body;
    },
    render: function(view, opts) {
      var view = require('views' + '/' + view);
      if (typeof(view) == 'function') {
        new view().render(opts);
      } else {
        view.render(opts);
      }
    }
  }
  var next;
  this.app.routes.middleware(req, res, function(err) {
    next = true;
  });
  return !next;
};

history.init = function(app) {
  var self = this;
  this.app = app;
  if (typeof(window) != 'undefined') {
    window.onload = function() {
      window.addEventListener('popstate', function(e) {
        if (!self.matchRoute()) {
          window.location.reload();
        }
      }, false);
      window.document.addEventListener('click', function(e) {
        if (e.target.href && e.which === 1 && !e.metaKey) {
          window.history.pushState(null, null, e.target.href);
          if (self.matchRoute()) {
            e.preventDefault();
          }
        }
      }, false);
    };
  }
};
