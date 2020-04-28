import React, { Component } from "react";
import { Switch, Link, BrowserRouter } from "react-router-dom";
import cocktail from "./cocktail.png";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    axios.get("/user/logout").then((res) => {
      if (res.data === "") {
        this.props.handleLogOut({
          loggedIn: false,
          username: null,
        });
      }
    });
  };

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <header>
        <div id="header">
          <Link to="/">Drink Maker</Link>
        </div>
        <img id="logo" src={cocktail}></img>
        <div id="logIn">
          {loggedIn ? (
            <div>
              Hi, {this.props.username}! |
              <Link id="logout" onClick={this.logout} to="/">
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link> |
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default Navbar;
