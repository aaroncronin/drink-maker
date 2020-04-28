import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

function Homepage(props) {
  const [filtered, setFiltered] = useState([]);
  const [searched, setSearched] = useState("");
  const [mode, setMode] = useState(false);
  /*
    componentDidMount() {
      let checked = this.props.items.filter((d) => d.isChecked);
      this.setState({ filtered: checked });
    }
    */
  useEffect(() => {
    console.log("homepage");
    let checked = props.items.filter((d) => d.isChecked);
    setFiltered(checked);
    document.body.style.overflow = "auto";
  }, [props.items]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const x = props.items.filter((i) => i.isChecked);
    localStorage.setItem("filteredItems", JSON.stringify(x));
    if (props.loggedIn) {
      axios.post("/user/saveIngredients", props.items).then((res) => {
        console.log("res: ", res);
      });
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

  const showModal = () => {
    setMode(!mode);
  };

  const loggedIn = props.loggedIn;
  const checked = filtered.map((d) => d.ingred);
  const search = props.items.filter((d) => d.ingred.includes(searched));

  return (
    <div className="App">
      {/* 
      <div id="itemLogin">{loggedIn ? <div></div> : <div> </div>}</div>

     <button id="modal" onClick={showModal}>
        MODAL
      </button> 
      <Modal mode={mode} {...props} />*/}

      <h2 class="text">Select The Ingredients In Your Home</h2>
      <h2 class="text">Your Ingredients</h2>
      <form id="container" onSubmit={handleSubmit}>
        <div id="searchTable">
          <form id="change" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Search for Ingredient"
            ></input>
          </form>
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
          <button id="submitIngredients" type="submit">
            Click For Drinks!
          </button>
        </div>
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

export default Homepage;
