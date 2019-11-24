const mongoose = require('mongoose');
const settings = require('./settings');

const settingsSchema = mongoose.Schema({
    settings: {type: settings.schema, required: true},
    date: {type: Date, required: true},
    wheater: { type: String, require: true}
  });
  
  module.exports = mongoose.model('Settings', settingsSchema);