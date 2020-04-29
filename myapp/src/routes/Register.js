import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setRegistered] = useState(false);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post("/user/register", { username, password }).then((res) => {
      if (res.data.message === "success") {
        setRegistered(true);
      } else {
        setError(res.data);
      }
    });
  };

  if (isRegistered) {
    const message = "Succesfully Registered! Login to Continue.";
    return <Redirect to={{ pathname: "/login", data: message }} />;
  }

  return (
    <div id="registration_login">
      <h1>Register Here</h1>
      <form id="registerForm" onSubmit={onSubmit}>
        <div id="usernameDiv">
          <label>Username: </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onChangeUsername}
            required
          />
          <br />
          <br />
          <br />
        </div>
        <div id="passwordDiv">
          <label>Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
          <br />
          <br />
        </div>
        <button id="submitButton">Register</button>
      </form>
      <h3 id="error">{error}</h3>
    </div>
  );
};

export default Register;
