// app.js
require('./db.js');
const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
const fetch = require('node-fetch')

const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')

const mongoose = require('mongoose');
const User = mongoose.model('User')
const PORT = 5000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/register', function (req, res) {

    res.render('register');
});

app.post('/register', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (user) {
            res.render('register', { error: "Username already in use!" })
        } else {
            const user = User(req.body);
            user.save((err, saved) => {
                if (err) {
                    console.log('error')
                } else {
                    res.redirect('/')
                }
            })
        }
    })
    /*
    User.findOne({username: req.body.username}, (err, user) => {
        passport.authenticate('local', (err, user, info) => {

            console.log('HELLO')
            
            if (err) {
                return next(err)
            }
    
            if (!user) {
                
                return res.redirect('/register')
    
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err)
    
                }
                return res.redirect('/')
            })
            
        })(req, res, next)
    })

    */

})


app.get('/data', (req, res) => {

    res.send(flattened)
})


app.get('/', (req, res) => {
    console.log(req.body)
})

app.get('/users', (req, res) => {
    User.find({}, (err, data) => {

        res.json(data)
    })
})

app.get('/ingreds', (req, res) => {

    res.send(all_ingreds);
});


const base = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='
let urls = []
for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i)
    const url = base + letter
    urls.push(url)
}
let arr = []
let obj = {}
let s = new Set()
let flattened = []

let all_ingreds = []
app.listen(PORT, () => {
    Promise.all(urls.map(url =>
        fetch(url).then(resp => resp.json())))
        .then(json => {

            for (let i = 0; i < 26; i++) {
                if (json[i]['drinks'] !== null) {
                    json[i]['drinks'].forEach((ele) => {
                        let z = {}
                        const abc = Object.keys(ele).filter((item) => item.includes("Ingredient") && ele[item] !== null)
                        const xyz = Object.keys(ele).filter((item) => item.includes("Measure") && ele[item] !== null)
                        const ingreds = abc.map((i) => ele[i])
                        const measures = xyz.map((i) => ele[i])

                        ingreds.filter((i) => i !== "").map((i) => s.add(i.toUpperCase()))

                        obj['id'] = ele['idDrink'];
                        obj['name'] = ele['strDrink'];
                        obj['ingredients'] = ingreds;
                        obj['measures'] = measures;
                        obj['instructions'] = ele['strInstructions'];
                        obj['image'] = ele['strDrinkThumb'];
                        obj['alcoholic'] = ele['strAlcoholic'];
                        obj['glass'] = ele['strGlass']

                        arr.push(obj)
                        obj = {}
                    })
                }

            }

            
            const test = Array.from(s).sort()
            test.forEach((item) => {
                let x = {}
                x['ingred'] = item;
                x['isChecked'] = false;
                all_ingreds.push(x)

            })
            
            flattened = [].concat.apply([], arr);

        }).catch(function () {
            console.log('Cant fetch API')
        })
});


module.exports = app