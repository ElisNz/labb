/* require module models and summarize */
const model = {};

model.book = require('./book-model');
model.rental = require('./rental-model');

module.exports = { model };