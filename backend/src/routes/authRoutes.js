import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// REGISTER //
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECK IF USER ALREADY EXISTS //
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    // HASH PASSWROD //
    const hashedPassword = await bcrypt.hash(password, 10);

    // CCREATE USER //
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// LOGIN //
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER //
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // COMPARE PASS //
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWTOKEN //
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

export default router;
