const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    lastName: String,
    firstName: String,
    role: {
      type: String,
      ref: 'Role',
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('findOne', function(next) {
  delete this.password;
  next();
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    try {
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
