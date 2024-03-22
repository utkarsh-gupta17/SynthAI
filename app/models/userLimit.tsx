// user model data
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userIdd: {
    type: String,
    required: true,
    unique: true,
  },
  numtrials: {
    type: Number,
    default:0
  },
},
  { timestamps: true }
);

export const userLimit = mongoose.models.users || mongoose.model("userlimits", userSchema);