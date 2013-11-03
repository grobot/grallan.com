var Poet = require('poet')
  ;

exports.init = function(app) {
  app.get('/blog/post/:post',
    getPost
  )

  app.get('/blog/tag/:tag',
    getPostsByTag
  )

  app.get('/blog',
    index
  )

  app.get('/blog/rss',
    rss
  );

  var poet = Poet(app, {
        posts: './posts/',
        postsPerPage: 5,
        metaFormat: 'json',
        routes: {
          '/blog/post/:post': 'post',
          '/blog/tag/:tag': 'tag',
          '/blog/category/:category': 'category'
        }
      });

  poet.init().then(function() {})

  function getPost(req, res, next) {
    var post = poet.helpers.getPosts(req.params.post);
    if (!post) return res.send(404);
    res.locals({
      post: post[0]
    })
    res.render('blog/post')
  }

  function getPostsByTag(req, res, next) {
    var taggedPosts = poet.helpers.postsWithTag(req.params.tag);
    if (taggedPosts.length) {
      res.locals({
        posts: taggedPosts,
        tag: req.params.tag
      });
      res.render('blog/list')
    }
  }

  function index(req, res, next) {
    var posts = poet.helpers.getPosts(0, 5);
    res.locals({
      posts: posts
    });
    res.render('blog/list')
  }

  function rss(req, res, next) {
    var posts = poet.helpers.getPosts(0, 5);
    res.setHeader('Content-Type', 'application/rss+xml');
    res.locals({
      posts: posts
    });
    res.render('rss');
  }
}

