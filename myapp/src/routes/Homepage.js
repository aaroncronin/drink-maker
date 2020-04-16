import React from "react";

function Homepage(props) {
  let filteredData = props.items.filter((d) => d.isChecked);

  function handleSubmit(event) {
    localStorage.setItem("filteredItems", JSON.stringify(filteredData));
    event.preventDefault();
    props.history.push("/data");
    // redirect
  }

  return (
    <div className="App">
      <form id="container" onSubmit={handleSubmit}>
        <div id="allIngredients">
          <h2 class="text">Select The Ingredients You Have in Your Home</h2>
          <table class="ingredientsTable">
            {props.items.map((d) => (
              <tr>
                <td>
                  <label>{d.ingred}</label>
                  <input
                    type="checkbox"
                    name={d.ingred}
                    checked={d.isChecked}
                    onChange={props.handleChange}
                  ></input>
                </td>
              </tr>
            ))}
          </table>
        </div>

        <div id="yourIngredients">
          <h2 class="text">Your Ingredients</h2>
          <table class="ingredientsTable">
            {filteredData.map((d) => (
              <tr>
                <td>
                  <div id="ingredient">{d.ingred}</div>
                </td>
              </tr>
            ))}
          </table>
        </div>

        <button id="submitIngredients" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Homepage;
