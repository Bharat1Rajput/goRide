const captainModel = require("../models/captain.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerCaptain = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const captain = await captainModel.findOne({ email });
    if (captain) {
      return res.status(400).json({ message: "captain already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCaptain = new captainModel({ name, email, password: hashedPassword });
    await newCaptain.save();

    const token = jwt.sign({ captainId: newCaptain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    delete newCaptain._doc.password;
    res
      .status(201)
      .json({ token, newCaptain, message: "Captain registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email });
    if (!captain) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password,  captain.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ captainId: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);

    delete captain._doc.password;

    res.status(200).json({token,captain, message: "Captain logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.logout = async (req, res) => {
  try {
    const token = blacklisttokenModel.create({ token: req.cookies.token });
    res.clearCookie("token");
    res.status(200).json({ message: "Captain logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.captain.captainId).select("-password");
    res.status(200).json({ captain });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
