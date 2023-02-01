const express = require("express");
const router = express.Router();
const { JWT_SECRET } = require("dotenv").config().parsed;
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const token = jwt.sign(req.user, JWT_SECRET, { expiresIn: 60 * 15 });
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Logged in" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;
