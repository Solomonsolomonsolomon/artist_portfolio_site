const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { User } = require("./../model/database");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
app.use(express.json());

module.exports = passport.use(
  new localStrategy({ passReqToCallback: true }, async function (
    req,
    username,
    password,
    done
  ) {
    
    User.findOne({ username }, async function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "incorrect credentials" });
      }
      let isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return done(null, false, { message: "incorrect credientials" });
      }
      if (isValid && user) {
        return done(null, user, { message: `successful login.Welcome` });
      }
    });
  })
);
