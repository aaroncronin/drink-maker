import React, { Component } from "react";
import "./App.css";
import Data from "./routes/Data";
import Homepage from "./routes/Homepage";
import Register from "./routes/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    this.setState({
      items: [
        { ingred: "vodka", isChecked: false },
        { ingred: "club soda", isChecked: false },
        { ingred: "lime", isChecked: false },
        { ingred: "whiskey", isChecked: false },
      ],
    });
  }

  handleChange = (event) => {
    let items = this.state.items.map((d) =>
      event.target.name === d.ingred ? { ...d, isChecked: !d.isChecked } : d
    );

    this.setState({ items });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/data"
            render={(props) => <Data ingreds={this.state.items} {...props} />}
          />
          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route
            path="/"
            render={(props) => (
              <Homepage
                items={this.state.items}
                handleChange={this.handleChange}
                {...props}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
