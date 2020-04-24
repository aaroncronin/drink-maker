import React, { Component } from "react";
import "./App.css";
import Data from "./routes/Data";
import Homepage from "./routes/Homepage";
import Register from "./routes/Register";
import Item from "./routes/Item";
import Users from "./routes/Users";
import Login from "./routes/Login";
import Navbar from "./routes/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { all_ingreds } from "./data.json";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: all_ingreds, loggedIn: false, username: null };

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   items: all_ingreds,
    // });
    this.getUser();
  }
  updateUser(obj) {
    this.setState(obj);
  }
  getUser() {
    console.log("getting user");
    axios.get("/user/login").then((res) => {
      console.log("login: ", res);
      if (res.user.username) {
        this.setState({ loggedIn: true, username: res.data.username });
      } else {
        this.setState({
          loggedIn: false,
          username: null,
        });
      }
    });
  }

  handleLogIn(data) {
    // STORE IN LOCAL STORAGE

    // THEN USE GETUSER METHOD TO GET LOCAL STORAGE ITEM
    if (data !== null) {
      this.setState({ loggedIn: true, username: data });
    }
  }

  handleLogOut(obj) {
    this.setState({ obj });
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
        <Navbar
          loggedIn={this.state.loggedIn}
          username={this.state.username}
          handleLogOut={this.handleLogOut}
        />
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
            <Route
              path="/login"
              render={(props) => (
                <Login handleLogIn={this.handleLogIn} {...props} />
              )}
            />
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
