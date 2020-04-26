import React, { useState, useEffect } from "react";

function Homepage(props) {
  const [filtered, setFiltered] = useState([]);
  const [searched, setSearched] = useState("");

  /*
    componentDidMount() {
      let checked = this.props.items.filter((d) => d.isChecked);
      this.setState({ filtered: checked });
    }
    */
  useEffect(() => {
    let checked = props.items.filter((d) => d.isChecked);
    setFiltered(checked);
  }, [props.items]);

  const handleSubmit = (event) => {
    //console.log(this.state.filtered);
    const x = props.items.filter((i) => i.isChecked);
    localStorage.setItem("filteredItems", JSON.stringify(x));
    event.preventDefault();
    props.history.push("/data");

    // MAKE POST REQUEST HERE
    // redirect
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    const searched = event.target.value.toUpperCase();
    setSearched(searched);
  };

  const loggedIn = props.loggedIn;
  //const loggedIn = false;
  //const username = this.props.username;
  // console.log(username);
  //const checked = props.items.filter((d) => d.isChecked).map((d) => d.ingred);
  const checked = filtered.map((d) => d.ingred);
  const search = props.items.filter((d) => d.ingred.includes(searched));

  return (
    <div className="App">
      <div id="itemLogin">{loggedIn ? <div></div> : <div> </div>}</div>
      <form id="change" onSubmit={handleSearchSubmit}>
        Search: <input type="text" onChange={handleSearchChange}></input>
      </form>

      <form id="container" onSubmit={handleSubmit}>
        <div id="allIngredients">
          <h2 class="text">Select The Ingredients In Your Home</h2>
          <table class="ingredientsTable">
            {search.map((d) => (
              <tbody>
                <tr>
                  <td>
                    <label>{d.ingred}</label>
                    <input
                      id="checkbox"
                      type="checkbox"
                      name={d.ingred}
                      checked={d.isChecked}
                      onChange={props.handleChange}
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
        </div>
        <button id="submitIngredients" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

// import React, { Component } from "react";

// class Homepage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { filtered: [], searched: "" };
//     // this.handleSearch = this.handleSearch.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);
//     // this.handleCheck = this.handleCheck.bind(this);
//   }

//   componentDidMount() {
//     let checked = this.props.items.filter((d) => d.isChecked);
//     this.setState({ filtered: checked });
//   }

//   handleSubmit = (event) => {
//     //console.log(this.state.filtered);
//     const x = this.props.items.filter((i) => i.isChecked);
//     localStorage.setItem("filteredItems", JSON.stringify(x));
//     event.preventDefault();
//     this.props.history.push("/data");

//     // MAKE POST REQUEST HERE
//     // redirect
//   };

//   handleSearch = (event) => {
//     event.preventDefault();
//     let x;
//     const searched = event.target.value.toUpperCase();
//     //x = this.state.items.filter((d) => d.ingred.includes(search));
//     this.setState({ searched });
//   };

//   // handleCheck(event) {
//   //   let items = this.state.items.map((d) =>
//   //     event.target.name === d.ingred ? { ...d, isChecked: !d.isChecked } : d
//   //   );
//   //   const filtered = items.filter((d) => d.isChecked).map((d) => d.ingred);
//   //   this.setState({ items, filtered });
//   // }

//   render() {
//     // const f = JSON.parse(localStorage.getItem("filteredItems"));
//     // console.log(f);
//     const loggedIn = this.props.loggedIn;
//     //const loggedIn = false;
//     //const username = this.props.username;
//     // console.log(username);
//     const checked = this.props.items
//       .filter((d) => d.isChecked)
//       .map((d) => d.ingred);

//     const searched = this.props.items.filter((d) =>
//       d.ingred.includes(this.state.searched)
//     );

//     return (
//       <div className="App">
//         <div id="itemLogin">
//           {loggedIn ? <div>{this.props.saveIngredients()}</div> : <div> </div>}
//         </div>
//         <form id="change">
//           Search: <input type="text" onChange={this.handleSearch}></input>
//         </form>

//         <form id="container" onSubmit={this.handleSubmit}>
//           <div id="allIngredients">
//             <h2 class="text">Select The Ingredients In Your Home</h2>
//             <table class="ingredientsTable">
//               {searched.map((d) => (
//                 <tbody>
//                   <tr>
//                     <td>
//                       <label>{d.ingred}</label>
//                       <input
//                         id="checkbox"
//                         type="checkbox"
//                         name={d.ingred}
//                         checked={d.isChecked}
//                         onChange={this.props.handleChange}
//                       ></input>
//                     </td>
//                   </tr>
//                 </tbody>
//               ))}
//             </table>
//           </div>

//           <div id="yourIngredients">
//             <h2 class="text">Your Ingredients</h2>
//             <table class="ingredientsTable">
//               {checked.map((d) => (
//                 <tbody>
//                   <tr>
//                     <td>
//                       <div id="ingredient">{d}</div>
//                     </td>
//                   </tr>
//                 </tbody>
//               ))}
//             </table>
//           </div>
//           <button id="submitIngredients" type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

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
