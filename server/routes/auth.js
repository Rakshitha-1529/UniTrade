const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {

  try {
    const {
      name,
      email,
      password,
      department,
      year,
      semester
    } = req.body;

    const emailRegex = /^[0-9]{5}[a-zA-Z][0-9]{4}@pvpsit\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message:
          "Use a valid PVPSIT email"
      });

    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have 8+ chars, uppercase, lowercase, number and special character"      });

    }

    const existingUser = await User.findOne({ email  });

    if (existingUser) {return res.status(400).json({ message: "Email already exists"});

    }

    // ---------- HASH PASSWORD ----------

    const hashedPassword = await bcrypt.hash(password,10 );

    // ---------- SAVE USER ----------

    const user = new User({name,email,password: hashedPassword,department,year,semester });

    await user.save();

    res.status(201).json({

      message: "Registration Successful"

    });

  }

  catch (error) { res.status(500).json({ message: error.message }); }});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {
    const {
      email,
      password
    } = req.body;
    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      message: "Login successful",

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        department: user.department,

        year: user.year,

        semester: user.semester

      }

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

module.exports = router;