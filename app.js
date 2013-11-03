var express = require('express')
  , app     = express()
  ;

app.use(express.logger());
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
app.use(app.router);

['index', 'blog', 'wcimfd'].map(function(controllerName) {
  var controller = require('./controllers/' + controllerName);
  controller.init(app);
})

app.listen(3000);
