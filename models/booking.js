const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    parkingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Parking"
    },

    vehicleNumber:String,

    bookingTime:Date

});

module.exports = mongoose.model("Booking",bookingSchema);