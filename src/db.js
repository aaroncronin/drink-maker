const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema({
  username: String,
  password: String,
});

const Drink = new mongoose.Schema({
  id: String,
  name: String,
  ingredients: [String],
  measures: [String],
  instructions: String,
  image: String,
  alcoholic: Boolean,
  glass: String,
});

const SavedDrinks = new mongoose.Schema({
  username: String,
  drinks: [Drink],
});

const options = {
  NoSaltValueStoredError: "SALTTTTT",
};
User.plugin(passportLocalMongoose, options);

let dbconf;
if (process.env.NODE_ENV === "PRODUCTION") {
  const fs = require("fs");
  const path = require("path");
  const fn = path.join(__dirname, "../config.json");
  const data = fs.readFileSync(fn);

  const conf = JSON.parse(data);
  dbconf = conf.dbconf;
} else {
  dbconf = "mongodb://localhost/DrinkMaker";
}

mongoose.model("User", User);
mongoose.model("SavedDrinks", SavedDrinks);
mongoose.model("Drink", Drink);

mongoose.connect(dbconf, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
