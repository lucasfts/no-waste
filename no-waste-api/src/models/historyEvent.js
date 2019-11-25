const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    settingsId: {type: String, required: true},
    name: {type: String, required: true}
  });
  
  module.exports = mongoose.model('HistoryEvent', eventSchema);