import React, { Component } from "react";
import "./App.css";
import Data from "./routes/Data";
import Homepage from "./routes/Homepage";
import Register from "./routes/Register";
import Item from "./routes/Item";
import Users from "./routes/Users";
import Login from "./routes/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { all_ingreds } from "./data.json";
import cocktail from "./routes/cocktail.png";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], loggedIn: false, username: null };

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.setState({
      items: all_ingreds,
    });
    this.getUser();
  }

  updateUser(loggedIn, username) {
    this.setState(loggedIn, username);
  }

  getUser() {
    console.log(JSON.parse(localStorage.getItem("username")));
  }

  handleChange = (event) => {
    let items = this.state.items.map((d) =>
      event.target.name === d.ingred ? { ...d, isChecked: !d.isChecked } : d
    );

    this.setState({ items });
  };

  render() {
    return (
      <div>
        <a href="/">
          <div id="header">Drink Maker</div>
        </a>
        <img id="logo" src={cocktail}></img>
        <div class="sidebar1"></div>
        <div class="sidebar2"></div>
        <div>{this.getUser}</div>
        <Router>
          <Switch>
            <Route path="/users" render={(props) => <Users {...props} />} />
            <Route
              path="/data"
              render={(props) => <Data ingreds={this.state.items} {...props} />}
            />
            <Route
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route path="/item" render={(props) => <Item {...props} />} />
            <Route
              path="/"
              render={(props) => (
                <Homepage
                  items={this.state.items}
                  handleChange={this.handleChange}
                  {...props}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
