import React, { Component } from "react";
import { data } from "../data.json";
import { Link } from "react-router-dom";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], fData: [] };
  }

  componentDidMount() {
    const fData = JSON.parse(localStorage.getItem("filteredItems"));
    const x = fData.map((ele) => ele.ingred);
    console.log(x);
    let l = [];
    data.forEach((drink) => {
      const newIngreds = drink.ingredients.map((d) => d.toUpperCase());
      const d = newIngreds.every((i) => x.indexOf(i) >= 0);
      if (d === true) {
        l.push(drink);
      }
    });

    this.setState({ data: l, fData });
  }

  render() {
    return (
      <div className="App">
        <Link
          to={{
            pathname: "/homepage",
          }}
        ></Link>

        <h1>All Drinks</h1>
        {this.state.data.map((d) => (
          <div class="gallery">
            <img src={d.image}></img>
            <Link
              id="link"
              to={{
                pathname: "/item",
                data: d,
              }}
            >
              <div>{d.name}</div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
export default Data;
