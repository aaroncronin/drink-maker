import React, { Component } from "react";
import "./App.css";
import Data from "./routes/Data";
import Homepage from "./routes/Homepage";
import Register from "./routes/Register";
import Item from "./routes/Item";
import Users from "./routes/Users";
import Login from "./routes/Login";
import Navbar from "./routes/Navbar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { all_ingreds } from "./data.json";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loggedIn: false,
      username: null,
      filtered: [],
    };

    // this.getUser = this.getUser.bind(this);
    // this.updateUser = this.updateUser.bind(this);
    // this.handleLogIn = this.handleLogIn.bind(this);
    // this.handleLogOut = this.handleLogOut.bind(this);
    // this.saveIngredients = this.saveIngredients.bind(this);
  }

  // async
  async componentDidMount() {
    // this.setState({
    //   items: all_ingreds,
    // });

    // await
    await this.getUser();
    console.log("HELLLOOOOO: state", this.state.loggedIn);
    if (this.state.loggedIn) {
      this.getItems();
    } else {
      this.setState({ items: all_ingreds });
    }
    // if logged in then getItems()
    // else set to all_ingreds
  }

  getUser = () => {
    axios.get("/user/login").then((res) => {
      if (res.data === "") {
        this.setState({
          loggedIn: false,
          username: null,
        });
      } else if (res.data.username) {
        this.setState({ loggedIn: true, username: res.data.username });

        // getItems()
      }
    });
    return;
  };

  // getItems() function sets items state based on log in
  getItems = () => {
    console.log("hello");
    axios.get("/user/items").then((res) => {
      console.log("items: ", res.data);
    });
  };
  handleLogIn = (data) => {
    if (data !== null) {
      this.setState({ loggedIn: true, username: data });
    }
  };

  handleLogOut = (obj) => {
    console.log(obj);
    this.setState({ loggedIn: obj.loggedIn, username: obj.username });
    console.log("state: ", this.state);
  };

  handleChange = (event) => {
    let items = this.state.items.map((d) =>
      event.target.name === d.ingred ? { ...d, isChecked: !d.isChecked } : d
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
