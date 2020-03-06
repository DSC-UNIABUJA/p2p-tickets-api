const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    _id: String,
    id: {
      type: String,
      required: true,
      unique: true,
    },
    success: {
      type: Date,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    ticket: {
      type: String,
      ref: 'Ticket',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model('Payment', paymentSchema);


module.exports = Payment;
