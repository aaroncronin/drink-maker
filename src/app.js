// app.js
require('./db.js');
const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');

const PORT = 3000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));


app.get('/register', (req, res) => {
    
    res.render('register')
});





app.listen(PORT);