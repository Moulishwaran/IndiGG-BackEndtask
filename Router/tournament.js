const express = require("express");
const router = express.Router();
const moment = require("moment");
const Tournament = require("../models/Tournament");

//Create New Tournament
router.post("/tournaments", async (req, res) => {
  try {
    const { name, tournamentName, startDate, endDate, tournamentStatus } =
      req.body;
    const tournament = new Tournament({
      name,
      tournamentName,
      startDate,
      endDate,
      tournamentStatus,
    });
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all tournament
router.get("/tournament", async (req, res) => {
  try {
    const tournament = await Tournament.find();
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific tournament by ID
router.get("/tournament/:id", getTournament, async (req, res) => {
  const { id } = req.params;
  try {
    const tournament = await Tournament.findById(id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: "Not Found" });
  }
});

// Update a tournament

router.patch("/tournaments/:id", getTournament, async (req, res) => {
  if (req.body.name != null) {
    res.tournament.name = req.body.name;
  }
  if (req.body.tournamentName != null) {
    res.tournament.tournamentName = req.body.tournamentName;
  }
  if (req.body.startDate != null) {
    res.tournament.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.tournament.endDate = req.body.endDate;
  }
  if (req.body.tournamentStatus != null) {
    res.tournament.tournamentStatus = req.body.tournamentStatus;
  }
  try {
    const updatedTournament = await res.tournament.save();
    res.json(updatedTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tournament

router.delete("/tournament/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the tournament by ID
    const deletedTournament = await Tournament.findByIdAndDelete(id);

    if (!deletedTournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Optionally, you can also delete associated participants if needed
    // await Participant.deleteMany({ tournamentId: id });

    res.status(200).json({ message: "Tournament deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to get a tournament by ID
async function getTournament(req, res, next) {
  let tournament;
  try {
    tournament = await Tournament.findById(req.params.id);
    if (tournament == null) {
      return res.status(404).json({ message: "Tournament not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.tournament = tournament;
  next();
}

module.exports = router;
