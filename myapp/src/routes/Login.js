import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message] = useState(props.location.data);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    axios
      .post("/user/login", user)
      .then((res) => {
        if (res.data.message === "success") {
          props.handleLogIn(res.data.user);
          props.history.push("/");
        } else {
          setError(res.data);
        }
      })
      .catch((err) => {
        console.log("login error", err);
      });
  };

  return (
    <div id="registration_login">
      <h3 id="message">{message}</h3>
      <h1>Login</h1>

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
        <button id="submitButton">Login</button>
      </form>
      <h3 id="error">{error}</h3>
    </div>
  );
}

export default Login;
