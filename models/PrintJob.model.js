const { Schema, model } = require("mongoose");

const printJobSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    file: String,
    path: String,
    pages: String,
    copies: Number,
    monochrome: Boolean,
    scale: String,
    status: {
      type: String,
      enum: ["pending", "failed", "completed"]
    }
  },
  {
    timestamps: true,
  }
);

const printJob = model("PrintJob", printJobSchema);

module.exports = printJob;
