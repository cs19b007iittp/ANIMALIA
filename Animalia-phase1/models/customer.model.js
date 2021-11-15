const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  id: Number,
  username: String,
  email: String,
  imagePath1: String,
  imagePath2: String,
  imagePath3: String,
  imagePath4: String
})

module.exports = mongoose.model('Customer', CustomerSchema);
