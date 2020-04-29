import React from "react";
import { Link } from "react-router-dom";
import cocktail from "./cocktail.png";
import axios from "axios";

const Navbar = (props) => {
  const logout = () => {
    axios.get("/user/logout").then((res) => {
      if (res.data === "") {
        props.handleLogOut({
          loggedIn: false,
          username: null,
        });
      }
    });
  };

  const loggedIn = props.loggedIn;
  return (
    <header>
      <div id="header">
        <Link to="/">Drink Maker</Link>
      </div>
      <img id="logo" src={cocktail} alt={cocktail}></img>
      <div id="logIn">
        {loggedIn ? (
          <div>
            Hi, {props.username}! |
            <Link id="logout" onClick={logout} to="/">
              Logout
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link> |<Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
