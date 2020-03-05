const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  _id: String,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  level: 'admin',
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
