const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // const user = new User({
        //     name,
        //     email,   // plain text password
        //     password
        // });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


// Login
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // if (user.password !== password) {
        //     return res.status(400).json({
        //         message: "Invalid password"  // plain text waale 
        //     });
        // }

        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
            message:"Invalid password"
            });
        }


        
        res.status(200).json({
            message: "Login Successful",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;