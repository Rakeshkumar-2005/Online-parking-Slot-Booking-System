const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});

const parkingRoutes = require("./routes/parkingRoutes");

app.use("/api/parking", parkingRoutes);

app.get("/",(req,res)=>{
    res.send("Parking API Running");
});

app.listen(5000,()=>{
    console.log("Server Running on Port 5000");
});
