import React from "react";

const Item = (props) => {
  const { data } = props.location;

  let drink = [];
  for (let i = 0; i < data.ingredients.length; i++) {
    if (data.measures[i] === undefined) {
      drink.push(data.ingredients[i]);
    } else {
      drink.push(data.measures[i] + " " + data.ingredients[i]);
    }
  }
  document.body.style.overflow = "auto";
  window.scrollTo(0, 0);

  return (
    <div id="drinkPage">
      <div id="name">{data.name}</div>
      <img src={data.image} alt=""></img>
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
};

export default Item;
