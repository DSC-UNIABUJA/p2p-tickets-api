const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
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
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  event: {
    type: String,
    ref: 'Event',
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
