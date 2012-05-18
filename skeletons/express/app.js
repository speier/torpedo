var torpedo = require('../..');

var app = module.exports = torpedo.createApp();

//app.register('mustache', exhogan);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.set('vendor', {
  root: __dirname + '/vendor',
  js: ['js/jquery-1.7.2.js', 'js/underscore-1.3.1.js', 'js/backbone-0.9.2.js', 'js/bootstrap.js'],
  css: []
});

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Home'
  });
});

app.get('/admin', function(req, res) {
  // get data/model and render mustache template (should be the same mechanish on server and client)  
  res.render('admin', {
    title: 'Admin'
  });
});

app.get('/user/:id?', function(req, res) {
  console.log(req);
  res.send('user id ' + req.params.id);
});

function getData(req) {
  // get data/model abstraction layer/method dummy for future  
  return {
    title: 'App'
  };
}
