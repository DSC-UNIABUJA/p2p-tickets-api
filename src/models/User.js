const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

export default User;
