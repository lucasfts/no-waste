const mongoose = require('mongoose');
const settings = require('./settings');
const meal = require('./meal');
const historyEvent = require('./historyEvent');


const settingsSchema = mongoose.Schema({
  settingsId: { type: settings.schema, required: true },
  date: { type: Date, required: true },
  hour: { type: String, required: true },
  wheater: { type: String, require: false },
  meals: { type: [meal.schema], require: true },
  events: { type: [historyEvent.schema], require: false }
});

module.exports = mongoose.model('History', settingsSchema);