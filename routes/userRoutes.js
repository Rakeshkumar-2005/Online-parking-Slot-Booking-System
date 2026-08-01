const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

if (name.trim().length < 3) {
        return res.status(400).json({
            message: "Name must be at least 3 characters"
        });

}
// Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid Email"
        });
    }

     // Password Validation
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must contain at least 6 characters"
        });
    }

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
    const { email, password } = req.body;

if (!email || !password) {

    return res.status(400).json({
        message: "Email and Password are required"
    });

}
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



        // res.status(200).json({
        //     message: "Login Successful",
        //     user
        // });
        const token = jwt.sign(
        {
        id: user._id,
        role: user.role
        },
        process.env.JWT_SECRET,
        {
        expiresIn: "1d"
        }
    );

        res.status(200).json({
            message: "Login Successful",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


//proctected route
router.get("/profile", auth, async (req, res) => {

    res.json({
        message: "Welcome User",
        userId: req.user.id
    });

});

module.exports = router;