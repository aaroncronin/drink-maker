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
        this.props.history.push("/");
      }
    });

    //
  };

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <header>
        <div id="header">
          <a href="/">Drink Maker</a>
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
              <Link to="/login">Log In</Link> |
              <Link to="/register">Register</Link>
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
