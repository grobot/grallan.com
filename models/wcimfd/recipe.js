"use strict";

var mongoose = require('mongoose')
  ;

var RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  cook_time_min: Number,
  prep_time_min: Number,
  number_of_servings: Number,
  fat_secret_id: { type: Number, unique: true, sparse: true},
  image_url: String,
  fixed: String,
  instructions: [
    {
      instruction: String
    }
  ],
  ingredients: [
    {
      name: String,
      unit: String,
      amount: Number,
      description: String
    }
  ]
});

module.exports = RecipeSchema;
