"use strict";

var mongoose = require('mongoose') ;

var IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  recipes: [String]
});

module.exports = IngredientSchema;
