exports.init = function(app) {
  app.get('/', function(req, res) {
    var posts = app.locals.getPosts(0, 5);
    console.log(posts);
    res.render('index', {
      posts: posts
    });
  });
  app.get('/projects', function(req, res) {
    res.render('projects');
  });
  app.get('/resume', function(req, res) {
    res.render('resume');
  });
  app.get('/about', function(req, res) {
    res.render('about');
  });
};
