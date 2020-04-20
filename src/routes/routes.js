require("../db.js");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.send(err);
        //res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        console.log("success");
        //res.redirect("/");
      });
    }
  );
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send("Password or username is incorrect!");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.send("success");
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
