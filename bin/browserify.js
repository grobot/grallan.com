var browserify   = require('browserify')
  , browserijade = require('browserijade')
  , fs           = require('fs')
  ;

function log() {
  var args = Array.prototype.slice.call(arguments);
	args.unshift("\033[0;36m" + "browserify:", "\033[m");
  console.log.apply(console, args);
}

['wcimfd'].forEach(function(directory) {
  var bundle = browserify({
    watch: true,
    cache: false,
    debug: false
  });

  bundle.on('syntaxError', function (err) {
    console.log(err.stack);
  });

  bundle.use(browserijade(__dirname + "/../views/public"));
  bundle.alias('jquery', 'jquery-browserify');
  bundle.require('jquery-browserify');

  bundle.addEntry('./client/' + directory + '/main.js');
  bundle.on('bundle', write);

  function write() {
    var src = bundle.bundle();
    var outfile = './public/js/' + directory + '.js';
    log('writing ' + outfile);
    fs.writeFileSync(outfile, src);
  }

  write();
})




