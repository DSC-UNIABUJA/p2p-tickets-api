const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: String,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  name: String,
  phone: String,
  role: {
    type: String,
    ref: 'Role',
  },
  eventToken: String,
  eventId: {
    type: String,
    ref: 'Event',
  },
});

const User = mongoose.model('User', userSchema);

export default User;
