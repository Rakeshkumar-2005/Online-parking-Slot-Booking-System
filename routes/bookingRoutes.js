const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Parking = require("../models/parking");

const auth = require("../middleware/authMiddleware");

// booking API

router.post("/book", auth, async (req, res) => {
    const { parkingId, vehicleNumber } = req.body;

if (!parkingId || !vehicleNumber) {
    return res.status(400).json({
        message: "Parking ID and Vehicle Number are required"
    });
}

    try {

        const { parkingId, vehicleNumber } = req.body;

        const parking = await Parking.findById(parkingId);

        if (!parking) {
            return res.status(404).json({
                message: "Parking not found"
            });
        }

        if (parking.availableSlots <= 0) {
            return res.status(400).json({
                message: "No Slots Available"
            });
        }

        const booking = new Booking({

            userId: req.user.id,
            parkingId,
            vehicleNumber

        });

        await booking.save();

        parking.availableSlots -= 1;

        await parking.save();

        res.status(201).json({

            message: "Parking Booked Successfully",
            booking

        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// Get My Bookings
router.get("/my-bookings", auth, async (req, res) => {

    try {

        const bookings = await Booking.find({
            userId: req.user.id
        }).populate("parkingId");

        res.json(bookings);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// Booking History
router.get("/history", auth, async (req, res) => {

    try {

        const bookings = await Booking.find({
            userId: req.user.id
        })
        .populate("parkingId", "name location")
        .sort({ bookingTime: -1 });

        const history = bookings.map(booking => ({
            bookingId: booking._id,
            vehicleNumber: booking.vehicleNumber,
            bookingTime: booking.bookingTime,
            parkingName: booking.parkingId?.name,
            location: booking.parkingId?.location
        }));

        res.status(200).json({
            totalBookings: history.length,
            bookings: history
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// Cancel Booking
router.delete("/cancel/:id", auth, async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Sirf apni booking cancel kar sakta hai
        if (booking.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        // Parking ki available slots +1
        const parking = await Parking.findById(booking.parkingId);

        if (parking) {
            parking.availableSlots += 1;
            await parking.save();
        }

        // Booking delete
        await Booking.findByIdAndDelete(req.params.id);

        res.json({
            message: "Booking Cancelled Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;