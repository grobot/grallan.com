"use strict";

var fs       = require('fs')
  , mongoose = require('mongoose')
  , walk     = require('walkdir')
  , config   = require('../config')
  , files    = fs.readdirSync(__dirname)
  , db       = mongoose.createConnection(config.mongo)
  ;

console.log("mongo connecting to " + config.mongo);

[
  'error', 'disconnected', 'open',
  'close', 'reconnected',  'fullsetup'
].forEach(function(e) {
  db.on(e, function() {
    console.log('mongo ' + e + ' event');
    if (arguments.length > 0) {
      console.log(arguments);
    }
  });
});

walk(__dirname, function(path, stat) {
  if (stat.isDirectory()) return;
  var file = path.split('/').pop();
  if (file === 'index.js') return;

  var match = /^(.*?([A-Za-z_]*))\.js$/.exec(file);
  if (!match) return;
  var name = match[2].split('_').map(function(v) {
    return v.charAt(0).toUpperCase() + v.slice(1);
  }).join('');
  console.log('Loading model ' + name);
  var model = require(path);
  model = db.model(name, model);
  exports[name] = model;
})
