import React, { useState, useEffect } from "react";

// CHANGE COLOR SCHEME TO GRAYS
// LOOK AT HULU FOR BASIS
function Modal(props) {
  const x = props.mode;

  return (
    <div id="modeBack">
      {x ? <div id="modeBox">HELLOOOOOOOOOOOOOOOOOOOOOOOOOO</div> : <div></div>}
    </div>
  );
}
export default Modal;
