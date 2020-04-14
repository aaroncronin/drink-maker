import React, { Component } from "react";

function Register(props) {
  return (
    <div id="parent">
      <form id="registerForm" method="POST">
        <input id="username" type="text" name="username" required />
        <input type="text" name="password" required />
      </form>
    </div>
  );
}

export default Register;
