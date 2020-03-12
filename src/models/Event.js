const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    _id: String,
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    location: String,
    coordinates: String,
    admin: {
      type: String,
      ref: 'User',
    },
    ticketPackage: [
      {
        amount: Number,
        _id: String,
        id: String,
        name: String,
        desc: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
