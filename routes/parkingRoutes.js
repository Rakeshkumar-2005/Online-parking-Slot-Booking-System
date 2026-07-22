const express = require("express");
const router = express.Router();

const Parking = require("../models/Parking");

// Add Parking
router.post("/add", async (req, res) => {
  try {
    const parking = new Parking(req.body);
    await parking.save();

    res.status(201).json(parking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Parking
router.get("/", async (req, res) => {
  try {
    const parking = await Parking.find();
    res.json(parking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;