import React, { Component } from "react";
import { Switch, Link, BrowserRouter } from "react-router-dom";
import cocktail from "./cocktail.png";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  logout = (event) => {
    event.preventDefault();
    axios.get("/user/logout").then((res) => {
      if (res.data === "") {
        this.props.handleLogOut({
          loggedIn: false,
          username: null,
        });
      }
    });

    //this.props.history.push("/");
  };

  render() {
    //const loggedIn = this.props.loggedIn;
    const loggedIn = false;
    const username = "acronin";

    console.log("PROPS: ", this.props);
    return (
      <header>
        <div id="header">
          <a href="/">Drink Maker</a>
        </div>
        <img id="logo" src={cocktail}></img>
        <div id="logIn">
          {loggedIn ? (
            <div>
              Hi, {username}! |
              <a id="logout" onClick={this.logout} href="/">
                Logout
              </a>
            </div>
          ) : (
            <div>
              <a href="/login">Log In</a> |<a href="/register">Register</a>
            </div>
          )}
        </div>
        <div class="sidebar1"></div>
        <div class="sidebar2"></div>
      </header>
    );
  }
}

export default Navbar;
