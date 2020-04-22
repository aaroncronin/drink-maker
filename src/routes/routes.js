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
        console.log(err);
        res.send(err.message);
        //res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        console.log("success");
        console.log(req.user);
        const info = { user: req.user.username };
        res.send(info);
      });
    }
  );
});
// router.get("/login", (req, res) => {
//   console.log("===== user!!======");
//   if (req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.json({ user: null });
//   }
// });
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.send("Password or username is incorrect!");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.send({ user: user.username, message: "success" });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
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
