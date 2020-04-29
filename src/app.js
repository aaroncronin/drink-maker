// app.js
require("./db.js");
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const fs = require("fs");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const routes = require("./routes/routes");

const UserItems = mongoose.model("UserItems");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "some secret value, changeme",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", routes);
app.use(express.static(path.join(__dirname, "..", "myapp", "build")));

app.post("/user/login", (req, res, next) => {
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
      res.send({ user: user.username, message: "success" });
    });
  })(req, res, next);
});

app.get("/user/login", (req, res) => {
  res.send(req.user);
});

app.get("/user/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

mongoose.set("useFindAndModify", false);

app.post("/user/saveIngredients", (req, res) => {
  const user = req.user.username;
  const items = req.body;

  const filter = { username: user };
  const update = { ingredients: items };
  UserItems.findOneAndUpdate(filter, update, { upsert: true }, (err, data) => {
    if (err) {
      res.send("500 error");
    } else if (!err) {
      res.send("success");
    }
  });
});

app.get("/user/items", (req, res) => {
  UserItems.find({ username: req.user.username }, (err, data) => {
    if (data.length !== 0) {
      res.send(data[0].ingredients);
    } else {
      res.send("error");
    }
  });
});

if (process.env.NODE_ENV === "PRODUCTION") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "myapp", "build", "index.html"));
  });
}

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

          const sortedArr = Array.from(s).sort();
          sortedArr.forEach((item) => {
            let x = {};
            x["ingred"] = item;
            x["isChecked"] = false;
            all_ingreds.push(x);
          });

          flattened = [].concat.apply([], arr);
          console.log("Data read.");
          const data_obj = { all_ingreds: all_ingreds, data: flattened };
          fs.writeFileSync("../myapp/src/data.json", JSON.stringify(data_obj));
        })
        .catch(function () {
          console.log("Cant fetch API");
        });
    }
  });
});

module.exports = app;
