var torpedo = require('torpedo');

var app = module.exports = torpedo.createApp();

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Home'
  });
});

app.get('/admin', function(req, res) {
  res.render('admin', {
    title: 'Admin'
  });
});

app.get('/user/:id?', function(req, res) {
  res.send('user id ' + req.params.id);
});
