import React from "react";

function Homepage(props) {
  const filteredData = props.items.filter((d) => d.isChecked);

  function handleSubmit(event) {
    localStorage.setItem("filteredItems", JSON.stringify(filteredData));
    event.preventDefault();
    props.history.push("/data");
    // redirect
  }

  return (
    <div className="App">
      <h1>Select The Ingredients You Have in Your Home</h1>
      <form id="container" onSubmit={handleSubmit}>
        <table id="ingredientsTable">
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

        <div id="yourIngredients">
          Your Ingredients<br></br>
          {filteredData.map((d) => (
            <div>{d.ingred}</div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Homepage;
