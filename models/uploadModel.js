const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    projectId: { type: Schema.Types.ObjectId, ref: "project" },
    name: { type: String, trim: true, require },
    description: { type: String, trim: true, require },
    status: { type: String, default: "Done" },
  },
  { versionKey: false, timestamps: true }
);

const uploadModel = mongoose.model("upload", uploadSchema);

module.exports = uploadModel;
