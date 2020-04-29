import React, { Component } from "react";
import "./App.css";
import Data from "./routes/Data";
import Homepage from "./routes/Homepage";
import Register from "./routes/Register";
import Item from "./routes/Item";
import Login from "./routes/Login";
import Navbar from "./routes/Navbar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { all_ingreds } from "./data.json";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: all_ingreds,
      loggedIn: false,
      username: null,
      filtered: [],
    };
  }

  // async
  async componentDidMount() {
    // await
    const username = await this.getUser();
    console.log(username);
    const loggedIn = username !== undefined;
    console.log(loggedIn);
    if (loggedIn) {
      const items = await this.getItems();
      console.log(items);
      this.setState({ loggedIn, username, items });
    } else {
      console.log("yuo");
      this.setState({ items: all_ingreds });
    }
    // if (this.state.loggedIn) {
    //   console.log("LOGGED IN");
    // } else {
    //   this.setState({ items: all_ingreds });
    // }
  }

  getUser = async () => {
    const res = await axios.get("/user/login");
    return res.data.username;
  };

  getItems = async () => {
    const res = await axios.get("/user/items");
    return res.data;
  };

  handleLogIn = (data) => {
    if (data !== null) {
      this.setState({ loggedIn: true, username: data });
    }
  };

  handleLogOut = (obj) => {
    this.setState({ loggedIn: obj.loggedIn, username: obj.username });
  };

  handleChange = (event) => {
    let name = event.target.getAttribute("name");
    let items = this.state.items.map((d) =>
      name === d.ingred ? { ...d, isChecked: !d.isChecked } : d
    );
    this.setState({ items });
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar
            loggedIn={this.state.loggedIn}
            username={this.state.username}
            handleLogOut={this.handleLogOut}
          />
          <Switch>
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
                <Login
                  handleLogIn={this.handleLogIn}
                  loggedIn={this.state.loggedIn}
                  {...props}
                />
              )}
            />
            <Route path="/item" render={(props) => <Item {...props} />} />
            <Route
              path="/"
              render={(props) => (
                <Homepage
                  items={this.state.items}
                  username={this.state.username}
                  loggedIn={this.state.loggedIn}
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
