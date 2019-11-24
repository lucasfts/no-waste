const mongoose = require('mongoose');
const settings = require('./settings');
const meal = require('./meal');
const historyEvent = require('./historyEvent');


const settingsSchema = mongoose.Schema({
  settings: { type: settings.schema, required: true },
  date: { type: Date, required: true },
  hour: { type: String, required: true },
  wheater: { type: String, require: true },
  meals: { type: [meal.schema], require: true },
  events: { type: [historyEvent.schema], require: true }
});

module.exports = mongoose.model('Settings', settingsSchema);