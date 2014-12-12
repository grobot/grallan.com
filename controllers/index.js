exports.init = function(app) {
  app.get('/',
    index
  );
  app.get('/projects',
    projects
  );
  app.get('/about',
    about
  );
};

function index(req, res, next) {
  res.render('index');
}
function projects(req, res, next) {
  res.render('projects');
}
function about(req, res, next) {
  res.render('about');
}
