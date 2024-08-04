const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    projectName: { type: String, trim: true, require },
  },
  { versionKey: false, timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
