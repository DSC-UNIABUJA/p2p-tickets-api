const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  _id: String,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  location: String,
  amount: String,
  coordinates: String,
  admin: {
    type: String,
    ref: 'User',
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
