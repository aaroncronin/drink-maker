// app.js
require("./db.js");
const express = require("express");
//const session = require("express-session");
const path = require("path");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");

const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");

const mongoose = require("mongoose");
const User = mongoose.model("User");
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());

app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//CUSTOM MIDDLEWARE
app.use(function (req, res, next) {
  if (req.user) {
    res.locals.currentUser = req.user;
  }
  next();
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
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

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
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

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/data", (req, res) => {
  res.send(flattened);
});

app.get("/hello", (req, res) => {
  User.find({}, (err, data) => {
    res.send({ data });
  });
});

app.get("/ingreds", (req, res) => {
  res.send(all_ingreds);
});

app.get("/dummy", connectEnsureLogin.ensureLoggedIn(), (req, res) => {});

const base = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
let urls = [];
for (let i = 97; i <= 122; i++) {
  const letter = String.fromCharCode(i);
  const url = base + letter;
  urls.push(url);
}
let arr = [];
let obj = {};
let s = new Set();
let flattened = [];

let all_ingreds = [];
const p = "myapp/src/data.json";

if (process.env.NODE_ENV === "production") {
  app.use(express.static("myapp/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "myapp", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  // check if file exists
  // else promises
  console.log(PORT);
  fs.stat(p, (err) => {
    if (!err) {
      console.log("data json");
      fs.readFile(p, "utf8", function (err, data) {
        flattened = data;
      });
    } else {
      Promise.all(urls.map((url) => fetch(url).then((resp) => resp.json())))
        .then((json) => {
          for (let i = 0; i < 26; i++) {
            if (json[i]["drinks"] !== null) {
              json[i]["drinks"].forEach((ele) => {
                let z = {};
                const abc = Object.keys(ele).filter(
                  (item) => item.includes("Ingredient") && ele[item] !== null
                );
                const xyz = Object.keys(ele).filter(
                  (item) => item.includes("Measure") && ele[item] !== null
                );
                const ingreds = abc.map((i) => ele[i]);
                const measures = xyz.map((i) => ele[i]);

                ingreds
                  .filter((i) => i !== "")
                  .map((i) => s.add(i.toUpperCase()));

                obj["id"] = ele["idDrink"];
                obj["name"] = ele["strDrink"];
                obj["ingredients"] = ingreds;
                obj["measures"] = measures;
                obj["instructions"] = ele["strInstructions"];
                obj["image"] = ele["strDrinkThumb"];
                obj["alcoholic"] = ele["strAlcoholic"];
                obj["glass"] = ele["strGlass"];

                arr.push(obj);
                obj = {};
              });
            }
          }

          const test = Array.from(s).sort();
          test.forEach((item) => {
            let x = {};
            x["ingred"] = item;
            x["isChecked"] = false;
            all_ingreds.push(x);
          });

          flattened = [].concat.apply([], arr);
          console.log("Data read.");
          const data_obj = { all_ingreds: all_ingreds, data: flattened };
          fs.writeFileSync("../myapp/src/data.json", JSON.stringify(data_obj));
          // save flattened to file
        })
        .catch(function () {
          console.log("Cant fetch API");
        });
    }
  });
});

module.exports = app;
