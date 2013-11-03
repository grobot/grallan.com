var express = require('express')
  , Poet    = require('poet')
  , app     = express ()
  , poet    = Poet(app, {
      posts: './posts/',
      postsPerPage: 5,
      metaFormat: 'json'
    })
  ;

poet.init().then(function() {
  console.log('poet inited');
  console.log('haizo');
})

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
app.use(app.router);


poet.addRoute('/blog/post/:post', function(req, res) {
  var post = poet.helpers.getPosts(req.params.post);
  if (!post) return res.send(404);
  res.render('blog/post', {
    post: post[0]
  })
})

poet.addRoute('/blog/tag/:tag', function(req, res) {
  var taggedPosts = poet.helpers.postsWithTag(req.params.tag);
  if (taggedPosts.length) {
    res.render('blog/index', {
      posts: taggedPosts,
      tag: req.params.tag
    });
  }
})

app.get('/blog', function(req, res) {
  var posts = poet.helpers.getPosts(0, 5);
  res.render('blog/index', {
    posts: posts
  });
})

app.get('/blog/rss', function (req, res) {
  // Only get the latest posts
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', { posts: posts });
});

app.get('/', function (req, res) {
  res.render('index', {
  });
})

app.listen(3000);
