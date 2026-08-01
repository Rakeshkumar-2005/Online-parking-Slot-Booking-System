const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
    name: String,

    location:String,

    totalSlots:Number,

    availableSlots:Number,

    pricePerHour:Number

});

module.exports = mongoose.model("Parking",parkingSchema);