var express = require('express')
  , Poet    = require('poet')
  , app     = express()
  , port    = process.env.PORT || 3000
  ;

var poet = Poet(app, {
  posts: './posts/',
  postsPerPage: 5,
  metaFormat: 'json'
});

poet.watch().init();

app.use(express.logger());
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
app.use(app.router);

['index', 'wcimfd'].map(function(controllerName) {
  var controller = require('./controllers/' + controllerName);
  controller.init(app);
});

app.listen(port);
console.log('listening on port ' + port);
