import React, { Component } from "react";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch("/hello", { mode: "cors" })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  render() {
    return (
      <div>
        <div>Aaron dfasdffsfds</div>
      </div>
    );
  }
}

export default Users;
