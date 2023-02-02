const express = require("express");
const router = express.Router();
const { JWT_SECRET } = require("dotenv").config().parsed;
const jwt = require("jsonwebtoken");
const passport = require("../config/passport");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const accessToken = jwt.sign(req.user, JWT_SECRET, { expiresIn: 60 * 15 });
    const refreshToken = jwt.sign({ email: req.user.email }, JWT_SECRET);

    res.cookie(
      "accessToken",
      accessToken,
      { httpOnly: true },
      { maxAge: 15 * 60 * 1000 }
    );
    res.cookie(
      "refreshToken",
      refreshToken,
      { httpOnly: true },
      { maxAge: 168 * 60 * 60 * 1000 }
    );

    res.status(200).json({ message: "Logged in" });
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

// refresh token route
router.post(
  "/refresh",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const accessToken = jwt.sign(req.user, JWT_SECRET, { expiresIn: 60 * 15 });

    res.cookie(
      "accessToken",
      accessToken,
      { httpOnly: true },
      { maxAge: 15 * 60 * 1000 }
    );

    res.status(200).json({ message: "Token refreshed" });
  }
);

module.exports = router;
