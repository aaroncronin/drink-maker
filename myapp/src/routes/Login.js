import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: "" };
  }

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("/user/login", user)
      .then((res) => {
        if (res.data.message === "success") {
          this.props.handleLogIn(res.data.user);
          this.props.history.push("/");
        } else {
          this.setState({ error: res.data });
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
    this.setState({ name: "", password: "" });
  };
  render() {
    return (
      <div id="registration_login">
        <h1>Login Here</h1>
        <form id="registerForm" onSubmit={this.onSubmit}>
          <div id="usernameDiv">
            <label>Username: </label>
            <input
              id="username"
              type="text"
              value={this.state.username}
              onChange={this.onChangeUsername}
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
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
            <br />
            <br />
          </div>
          <button id="submitButton">Login</button>
        </form>
        <h3 id="error">{this.state.error}</h3>
      </div>
    );
  }
}

export default Login;
