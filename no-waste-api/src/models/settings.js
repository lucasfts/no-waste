const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    userId: {type: String, required: true},
    institution: {type: String, required: true},
    state: {type: {id: Number, sigla: String, nome: String }, required: true },
    city: {type: {id: Number, nome: String }, required: true }
  });
  
  
  module.exports = mongoose.model('Settings', settingsSchema);