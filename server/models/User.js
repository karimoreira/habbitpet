const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  mood: { type: String, default: "feliz" },
  petName: { type: String, default: "Doguinho" },

  habits: [
    {
      name: String,
      done: { type: Boolean, default: false },
    },
  ],

  rewards: [
    {
      title: String,
      achievedAt: Date,
    },
  ]

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
