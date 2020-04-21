import React, { Component } from "react";

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props.location;

    let drink = [];
    for (let i = 0; i < data.ingredients.length; i++) {
      if (data.measures[i] === undefined) {
        drink.push(data.ingredients[i]);
      } else {
        drink.push(data.measures[i] + " " + data.ingredients[i]);
      }
    }
    return (
      <div id="drinkPage">
        <div id="name">{data.name}</div>
        <img src={data.image}></img>
        <div id="drinkIngredients">
          <span>Ingredients:</span>
          {drink.map((i) => (
            <h3>{i}</h3>
          ))}
        </div>
        <div id="instructions">
          <h3>Instructions</h3>
          {data.instructions}
          <h2>Enjoy!</h2>
        </div>
      </div>
    );
  }
}

export default Item;
