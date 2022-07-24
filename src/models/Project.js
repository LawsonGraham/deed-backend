const mongoose = require('mongoose');
const validator = require('validator');
const consts = require('../consts');

var Schema = mongoose.Schema;

const projectsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Project', projectsSchema);
