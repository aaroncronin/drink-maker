import React, { useState, useEffect } from "react";
import "./App.css";
import Data from "./routes/Data";
import Homepage from "./routes/Homepage";
import Register from "./routes/Register";
import Item from "./routes/Item";
import Login from "./routes/Login";
import Navbar from "./routes/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { all_ingreds } from "./data.json";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState(all_ingreds);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const getUser = async () => {
    const res = await axios.get("/user/login");
    return res.data.username;
  };

  const getItems = async () => {
    const res = await axios.get("/user/items");
    if (res.data === "error") {
      return all_ingreds;
    }
    return res.data;
  };

  const handleLogIn = async (data) => {
    if (data !== null) {
      setLoggedIn(true);
      setUsername(data);
      const i = await getItems();
      setItems(i);
    }
  };

  const handleLogOut = ({ loggedIn, username }) => {
    setLoggedIn(loggedIn);
    setUsername(username);
    setItems(all_ingreds);
  };

  const handleChange = (event) => {
    let name = event.target.getAttribute("name");
    let i = items.map((d) =>
      name === d.ingred ? { ...d, isChecked: !d.isChecked } : d
    );
    setItems(i);
  };

  useEffect(() => {
    const getUserData = async () => {
      const user = await getUser();
      const log = user !== undefined;
      if (log) {
        const i = await getItems();
        setItems(i);
        setLoggedIn(log);
        setUsername(user);
      } else {
        setItems(all_ingreds);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <Router>
        <Navbar
          loggedIn={loggedIn}
          username={username}
          handleLogOut={handleLogOut}
        />
        <Switch>
          <Route
            path="/data"
            render={(props) => <Data ingreds={items} {...props} />}
          />
          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route
            path="/login"
            render={(props) => (
              <Login handleLogIn={handleLogIn} loggedIn={loggedIn} {...props} />
            )}
          />
          <Route path="/item" render={(props) => <Item {...props} />} />
          <Route
            path="/"
            render={(props) => (
              <Homepage
                items={items}
                username={username}
                loggedIn={loggedIn}
                handleChange={handleChange}
                {...props}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
