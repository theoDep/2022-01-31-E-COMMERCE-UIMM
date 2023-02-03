const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { PrismaClient } = require("@prisma/client");
const { passwordVerify } = require("../middlewares/password");
const { JWT_SECRET } = require("dotenv").config().parsed;

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("Entered passport.use");
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { alias: username }],
      },
    });

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (!(await passwordVerify(user.password, password))) {
      return done(null, false, { message: "Incorrect password." });
    }
    const { password: _, ...userWithoutPassword } = user;

    return done(null, userWithoutPassword, {
      message: "Logged In Successfully",
    });
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: (req) => {
        let token;
        if (req && req.cookies) {
          token = req.cookies["refreshToken"];
        }
        return token;
      },
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      const user = await prisma.user.findUnique({
        where: {
          email: jwtPayload.email,
        },
      });

      if (!user) {
        return done(null, false, { message: "Token is invalid" });
      }

      const { password: _, ...userWithoutPassword } = user;

      return done(null, userWithoutPassword);
    }
  )
);

module.exports = passport;
