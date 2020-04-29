# Drink Maker

[Drink Maker Website](aaroncronin-drinkmaker.herokuapp.com)

## Overview

Alcohol sales have increased more than 50% during quarantine compared to this time last year. People are passing the time by drinking, but sometimes just grabbing a liquor and a mixer can be boring. So here comes Drink Maker!

Drink Maker allows people to select ingredients they have in their house and Drink Maker shows you different cocktails you could make. The site does not require someone to register or login, but they do have the option. If a user registers, then the ingredients they checked off that they have in their house are automatically saved for when they login at a later time. During a time when people are looking for fun things to do in their homes, Drink Maker is the perfect solution!

## Data Model

The application will store Users and a User's Saved Ingredients

- when a user is logged in, checked off ingredients are auto-saved
- the drinks are sourced from a cocktail API

An Example User:

```javascript
{
  username: "aaroncronin",
  password: // password hash
}
```

An Example User's Saved Ingredients:

```javascript
{
  username: "aaroncronin"; // references user,
  ingredients: [{ ingred, isChecked }]; // array of ingredients
}
```

## [Link to Commented First Draft Schema](db.js)

## Wireframes

/signin - login page

![login](src/charts/wireframes/signin.png)

/register - register page

![register](src/charts/wireframes/register.png)

/homepage - select your ingredients

![homepage](src/charts/wireframes/homepage.png)

/searchresults - drinks to make

![results](src/charts/wireframes/searchresults.png)

/drink - item page

![item](src/charts/wireframes/drink.png)

## Site Map

![Site Map](src/charts/sitemap.png)

## User Stories

1. as non-registered user, I can register a new account with the site
2. as a non-registered or registered user, I can see cocktails I can make by entering liquors and other ingredients I have in my house
3. as a non-registered or registered user, I can view a drink's details, such as ingredients and instructions on how to make
4. as a registered user, I can sign in to my account
5. as a signed in user, I can see which ingredients I had checked off previously

## Research Topics

- (5 points) User authentication
  - I will use passport.js for user authentication
  - My site requires users to register/login in order to play the game and see their stats
  - I have never used the passport middleware, so I will have to learn how to implement and use it properly
- (5 points) react.js
  - I will use react for my frontend framework
  - I have never worked with react, only node for backend, so this will be a challenge for me
- (3 points) External cocktail API
  - I will be sourcing the cocktail information from a cocktail database API
  - I do not have much experience with fetch and Promises in javascript, so this will be a fun challenge

## [Link to Initial Main Project File](app.js)

## Annotations / References Used

1. [passport.js authentication docs](http://passportjs.org/docs)

2. [react.js docs on getting started](https://reactjs.org/docs/getting-started.html)

3. [react.js tutorial](https://www.youtube.com/watch?v=sBws8MSXN7A)
