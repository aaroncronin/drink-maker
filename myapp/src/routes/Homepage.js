import React, { Component } from "react";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], filtered: [] };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    let filtered = this.props.items.filter((d) => d.isChecked);
    this.setState({ items: this.props.items, filtered });
  }

  handleSubmit(event) {
    //localStorage.setItem("filteredItems", JSON.stringify(filteredData));
    event.preventDefault();
    this.props.history.push("/data");
    // redirect
  }

  handleSearch(event) {
    event.preventDefault();
    let x;
    const search = event.target.value.toUpperCase();
    if (search === "") {
      x = this.props.items;
    } else {
      x = this.state.items.filter((d) => d.ingred.includes(search));
    }
    this.setState({ items: x });
  }

  handleCheck(event) {
    let items = this.state.items.map((d) =>
      event.target.name === d.ingred ? { ...d, isChecked: !d.isChecked } : d
    );

    const filtered = items.filter((d) => d.isChecked).map((d) => d.ingred);
    this.setState({ items, filtered });
  }

  render() {
    return (
      <div className="App">
        <form onChange={this.handleSearch}>
          Enter data:<input type="text"></input>
        </form>
        <form id="container" onSubmit={this.handleSubmit}>
          <div id="allIngredients">
            <h2 class="text">Select The Ingredients In Your Home</h2>
            <table class="ingredientsTable">
              {this.state.items.map((d) => (
                <tbody>
                  <tr>
                    <td>
                      <label>{d.ingred}</label>
                      <input
                        id="checkbox"
                        type="checkbox"
                        name={d.ingred}
                        checked={d.isChecked}
                        onChange={this.handleCheck}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>

          <div id="yourIngredients">
            <h2 class="text">Your Ingredients</h2>
            <table class="ingredientsTable">
              {this.state.filtered.map((d) => (
                <tbody>
                  <tr>
                    <td>
                      <div id="ingredient">{d}</div>
                    </td>
                  </tr>
                </tbody>
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
}

// function Homepage(props) {
//   let filteredData = props.items.filter((d) => d.isChecked);

//   function handleSubmit(event) {
//     localStorage.setItem("filteredItems", JSON.stringify(filteredData));
//     event.preventDefault();
//     props.history.push("/data");
//     // redirect
//   }
//   let x = [];
//   function handleSearch(event) {
//     event.preventDefault();
//     const search = event.target.value.toUpperCase();
//     if (!search) {
//       console.log("hello");
//     }
//     console.log(search);
//     if (search === "") {
//       x = ["aaron"];
//     } else {
//       props.items.filter((d) => d.ingred.includes(search));
//     }
//     return x;
//   }
//   const arr = ["AARON", "BRANDON", "TIM", "AARON"];
//   return (
//     <div className="App">
//       <form onChange={handleSearch}>
//         Enter data:<input type="text"></input>
//       </form>
//       <form id="container" onSubmit={handleSubmit}>
//         <div id="allIngredients">
//           <h2 class="text">Select The Ingredients In Your Home</h2>
//           <table class="ingredientsTable">
//             {props.items.map((d) => (
//               <tbody>
//                 <tr>
//                   <td>
//                     <label>{d.ingred}</label>
//                     <input
//                       id="checkbox"
//                       type="checkbox"
//                       name={d.ingred}
//                       checked={d.isChecked}
//                       onChange={props.handleChange}
//                     ></input>
//                   </td>
//                 </tr>
//               </tbody>
//             ))}
//           </table>
//         </div>

//         <div id="yourIngredients">
//           <h2 class="text">Your Ingredients</h2>
//           <table class="ingredientsTable">
//             {filteredData.map((d) => (
//               <tr>
//                 <td>
//                   <div id="ingredient">{d.ingred}</div>
//                 </td>
//               </tr>
//             ))}
//           </table>
//         </div>
//         <button id="submitIngredients" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
export default Homepage;
