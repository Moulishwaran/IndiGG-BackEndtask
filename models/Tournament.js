const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: String,
  tournamentName: String,
  startDate: Date,
  endDate: Date,
  tournamentStatus: String,
  // participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participant" }],
});

module.exports = mongoose.model("Tournament", tournamentSchema);
