const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema({
  username: String,
  password: String,
});

const UserItems = new mongoose.Schema({
  username: String,
  ingredients: [
    {
      ingred: String,
      isChecked: Boolean,
    },
  ],
});

User.plugin(passportLocalMongoose);

mongoose.model("User", User);
mongoose.model("UserItems", UserItems);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/DrinkMaker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
