import React, { Component } from "react";

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props.location;

    return (
      <div>
        <div id="drinkInfo">
          <div>{data.name}</div>
          <img src={data.image}></img>
        </div>
        Ingredients: <div>{data.ingredients}</div>
        <div>{data.measures}</div>
        <div>{data.instructions}</div>
        <div>{data.alcoholic}</div>
        <div>{data.glass}</div>
      </div>
    );
  }
}

export default Item;
