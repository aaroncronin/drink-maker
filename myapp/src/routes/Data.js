import React, { Component } from "react";
import data from "../data.json";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const fData = JSON.parse(localStorage.getItem("filteredItems"));
    this.setState({ data });
    // fetch("../src/data.json")
    //   .then((res) => res.json())
    //   .then((data) => this.setState({ data }));
  }

  render() {
    return (
      <div className="App">
        <h1>All Drinks</h1>

        {this.state.data.map((d) => (
          <div class="gallery">
            <img src={d.image}></img>
            <div>{d.name}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default Data;
