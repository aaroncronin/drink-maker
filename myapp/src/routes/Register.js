import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { username: "", password: "", error: "", isRegistered: false };
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post("/user/register", user).then((res) => {
      console.log(res);
      if (res.data.message === "success") {
        this.setState({ isRegistered: true });
      } else {
        this.setState({ error: res.data });
      }
    });
    // .catch((error) => {
    //   console.log(error);
    // });
    this.setState({ name: "", password: "" });
  }
  render() {
    if (this.state.isRegistered) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <div id="registration">
        <h1>Register Here</h1>
        <form id="registerForm" onSubmit={this.onSubmit}>
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
          <label>Password: </label>
          <input
            id="username"
            type="text"
            value={this.state.password}
            onChange={this.onChangePassword}
            required
          />
          <br />
          <br />
          <input id="submitButton" type="submit"></input>
        </form>
        <h3 id="error">{this.state.error}</h3>
      </div>
    );
  }
}

export default Register;
