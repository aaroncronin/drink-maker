import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { username: "", password: "", error: "" };
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
    axios
      .post("http://localhost:5000/login", user)
      .then((res) => {
        if (res.data === "success") {
          this.props.history.push("/homepage");
        } else {
          this.setState({ error: res.data });
        }

        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ name: "", password: "" });
  }
  render() {
    return (
      <div id="registration">
        <h1>Login Here</h1>

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

export default Login;
