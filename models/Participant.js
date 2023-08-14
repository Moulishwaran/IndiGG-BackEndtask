const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: String,
  emailId: String,
  country: String,
  gender: String,
  age: Number,
});

module.exports = mongoose.model("Participant", participantSchema);
