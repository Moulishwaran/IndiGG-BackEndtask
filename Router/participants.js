const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");

//Create a New participant
router.post("/create", async (req, res) => {
  try {
    const participant = await Participant.create(req.body);
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all participants
router.get("/participants", async (req, res) => {
  try {
    const participant = await Participant.find();
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Participants

router.put("/participants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateParticipant = await Participant.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updateParticipant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    res.status(200).json(updateParticipant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete participant

router.delete("/participants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteParticipant = await Participant.findByIdAndDelete(id);
    if (!deleteParticipant) {
      return res.status(404).json({ Message: "Participant Not found" });
    }
    res.status(200).json({ Message: "Participant Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
