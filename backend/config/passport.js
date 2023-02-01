const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { alias: username }],
      },
    });

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    const { password: _, ...userWithoutPassword } = user;

    return done(null, userWithoutPassword);
  })
);

module.exports = passport;
