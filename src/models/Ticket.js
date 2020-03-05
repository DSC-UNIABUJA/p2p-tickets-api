const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    _id: String,
    id: {
      type: String,
      required: true,
      unique: true,
    },
    event: {
      type: String,
      ref: 'Event',
    },
    user: {
      type: String,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
