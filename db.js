const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    hash: String,
    overall_stats: Object,
    game_stats: Object
});

const Stats = new mongoose.Schema({
    username: String,
    total_games: Number,
    average_tries: Object
});

const Pictures = new mongoose.Schema({
    name: String,
    pictures: Array
})

mongoose.model('User', User);
mongoose.model('Stats', Stats);
mongoose.model('Pictures', Pictures);

mongoose.connect(dbconf, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});