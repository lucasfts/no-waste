const mongoose = require('mongoose');
const food = require('./food');

const mealSchema = mongoose.Schema({
    food: {type: food.schema, required: true},
    qtdProduced: {type: Number, required: true},
    qtdWasted: { type: Number, require: true}
  });
  
  module.exports = mongoose.model('Meal', mealSchema);