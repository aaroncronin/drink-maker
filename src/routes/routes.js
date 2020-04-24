require("../db.js");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/register", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.send(err.message);
      } else {
        passport.authenticate("local")(req, res, function () {
          const info = { message: "success", user: req.user.username };
          res.send(info);
        });
      }
    }
  );
});

router.get("/data", (req, res) => {
  res.send(flattened);
});

router.get("/hello", (req, res) => {
  User.find({}, (err, data) => {
    res.send({ data });
  });
});

router.get("/ingreds", (req, res) => {
  res.send(all_ingreds);
});

//router.get("/dummy", connectEnsureLogin.ensureLoggedIn(), (req, res) => {});

module.exports = router;
