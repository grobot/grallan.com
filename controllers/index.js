exports.init = function(app) {
  app.get('/',
    index
  );
  app.get('/projects',
    projects
  );
  app.get('/resume',
    resume
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
function resume(req, res, next) {
  res.render('resume');
}
function about(req, res, next) {
  res.render('about');
}
