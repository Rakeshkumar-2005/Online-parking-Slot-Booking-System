const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({

    location:String,

    totalSlots:Number,

    availableSlots:Number,

    pricePerHour:Number

});

module.exports = mongoose.model("Parking",parkingSchema);