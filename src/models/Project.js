const mongoose = require('mongoose');
const consts = require('../consts');

var Schema = mongoose.Schema;

const projectsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Project', projectsSchema);
