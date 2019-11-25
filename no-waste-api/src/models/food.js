const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    settingsId: {type: String, required: true},
    name: {type: String, required: true},
    unit: { type: String, require: true},
    category: { type: String, require: true}
  });
  
  module.exports = mongoose.model('Food', foodSchema);