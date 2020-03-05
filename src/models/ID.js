const mongoose = require('mongoose');

const idSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

const ID = mongoose.model('ID', idSchema);

module.exports = ID;
