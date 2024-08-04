const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, require },
    userName: { type: String, trim: true, require },
    password: { type: String, trim: true, require },
    profilePic: { type: String, trim: true, require },
  },
  { versionKey: false, timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;