import React, { useState, useEffect } from "react";
import axios from "axios";

const Homepage = (props) => {
  const [filtered, setFiltered] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    let checked = props.items.filter((d) => d.isChecked);
    setFiltered(checked);
    document.body.style.overflow = "auto";
  }, [props.items]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const x = props.items.filter((i) => i.isChecked);
    localStorage.setItem("filteredItems", JSON.stringify(x));
    if (props.loggedIn) {
      axios.post("/user/saveIngredients", props.items);
    }
    props.history.push("/data");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    const searched = event.target.value.toUpperCase();
    setSearched(searched);
  };

  const checked = filtered.map((d) => d.ingred);
  const search = props.items.filter((d) => d.ingred.includes(searched));

  return (
    <div className="App">
      <h2 className="text">Select The Ingredients In Your Home</h2>
      <h2 className="text">Your Ingredients</h2>
      <div id="container">
        <div id="searchTable">
          <form id="change" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Search for Ingredient"
            ></input>
          </form>
          <table className="ingredientsTable">
            {search.map((d) => (
              <tbody key={d.ingred}>
                <tr>
                  <td>
                    <div name={d.ingred} onClick={props.handleChange}>
                      <label name={d.ingred}>{d.ingred}</label>
                      <input
                        id="checkbox"
                        type="checkbox"
                        name={d.ingred}
                        checked={d.isChecked}
                      ></input>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div id="yourIngredients">
          <table className="ingredientsTable">
            {checked.map((d) => (
              <tbody>
                <tr>
                  <td>
                    <div id="ingredient">{d}</div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <button id="submitIngredients" onClick={handleSubmit}>
            Click For Drinks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
