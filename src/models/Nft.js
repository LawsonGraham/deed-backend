const mongoose = require('mongoose');
const validator = require('validator');
const consts = require('../consts');

var Schema = mongoose.Schema;

const nftsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  nftName: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  projecturl: {
    type: String,
    required: true,
    unique: true,
  },
  transactions: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Nft', nftsSchema);
