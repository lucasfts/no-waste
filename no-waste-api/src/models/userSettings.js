const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    userId: {type: String, required: true},
    settingsId: {type: String, required: true}
  });
  
  module.exports = mongoose.model('UserSettings', settingsSchema);