"use strict";

var mongoose = require('mongoose')
  , models   = require('../models')
  , ObjectId = mongoose.Types.ObjectId
  ;

exports.init = function(app) {
  app.get('/wcimfd', index);
  app.get('/wcimfd/search/ingredient', searchIngredient);
  app.get('/wcimfd/details/:id', recipeDetails);
  app.get('/wcimfd/recipes/get', getRecipes);
}

function index(req, res, next) {
  res.render('wcimfd/index');
};

function searchIngredient(req, res, next) {
  models.Ingredient.find().regex('name', "^" + req.query.q).exec(function(err, docs) {
    if (err) return next(err);
    res.json({
      count: docs.length,
      results: docs.slice(0, 50)
    });
  });
}

function recipeDetails(req, res, next) {
  models.Recipe.find({_id: req.params.id}, function(err, docs) {
    if(err) return res.send(500, err);
    res.render('wcimfd/details', {recipe: docs[0]});
  });
}

function getRecipes(req, res, next) {
  var ids = req.query.ids.split(',').map(function(id) {
    return { _id: ObjectId(id) }
  });
  models.Recipe.find({$or: ids}, function(err, docs) {
    if (err) return next(err);
    var ids = req.query.ids.split(',');
    docs.sort(function(a, b) {
      return ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString());
    });
    res.json(docs);
  });
}
