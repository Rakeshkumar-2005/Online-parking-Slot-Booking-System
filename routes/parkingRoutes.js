const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Booking = require("../models/Booking");

const Parking = require("../models/Parking");


// Add Parking
router.post("/add", async (req, res) => {
  const { name, location, totalSlots, availableSlots } = req.body;

  if (!name || !location || totalSlots == null || availableSlots == null) {
    return res.status(400).json({
        message: "All fields are required"
    });
  }
  try {
    const parking = new Parking(req.body);
    await parking.save();

    res.status(201).json(parking);
  } catch (err) {
    console.error(err);

    res.status(500).json({
    message: "Internal Server Error"
});
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

// Search Parking by Location
router.get("/search/:location", async (req, res) => {

    try {

        const parking = await Parking.find({
            location: {
                $regex: req.params.location,
                $options: "i"
            }
        });

        res.json(parking);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// Get Parking Availability
router.get("/availability/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    try {

        const parking = await Parking.findById(req.params.id);

        if (!parking) {
            return res.status(404).json({
                message: "Parking not found"
            });
        }

        const occupiedSlots = parking.totalSlots - parking.availableSlots;

        res.json({

            parkingName: parking.name,
            location: parking.location,
            totalSlots: parking.totalSlots,
            availableSlots: parking.availableSlots,
            occupiedSlots: occupiedSlots

        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});  
    // Update Parking
router.put("/update/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }
    try {

        const parking = await Parking.findById(req.params.id);

        if (!parking) {
            return res.status(404).json({
                message: "Parking not found"
            });
        }

        parking.name = req.body.name || parking.name;
        parking.location = req.body.location || parking.location;
        parking.totalSlots = req.body.totalSlots || parking.totalSlots;
        parking.availableSlots = req.body.availableSlots || parking.availableSlots;

        await parking.save();

        res.status(200).json({
            message: "Parking Updated Successfully",
            parking
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// Delete Parking
router.delete("/delete/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }
    try {

        const parking = await Parking.findById(req.params.id);

        if (!parking) {
            return res.status(404).json({
                message: "Parking not found"
            });
        }

        // Check if parking has any bookings
        const bookingExists = await Booking.findOne({
            parkingId: req.params.id
        });

        if (bookingExists) {
            return res.status(400).json({
                message: "Cannot delete parking. Active bookings exist."
            });
        }

        await Parking.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Parking Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;