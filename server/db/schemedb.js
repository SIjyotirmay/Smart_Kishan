const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // Optional
  applyLink: String, // ✅ New field for application URL
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Scheme", schemeSchema);
