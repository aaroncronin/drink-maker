import React, { Component } from 'react';
import CheckBox from '../Checkbox'


class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {items: [], clicked: []}
  }
  

  componentDidMount() {
    fetch('/ingreds')
      .then(res => res.json())
      .then(items => this.setState({ items }))
  }
  //{() => this.setState({items: this.handleClick(d.ingred)})}
  handleCheckChieldElement = (event) => {
    let items = this.state.items
    items.forEach(item => {
      if (item.ingred === event.target.ingred)
        item.isChecked = event.target.checked
      })
    this.setState({items: items})
 }
  
  render() {
    return (
      <div className="App">
        <h1>Select The Ingredients You Have in Your Home</h1>
        <div id='container'>
          
          
          <div id='ingredientsTable'>
          {this.state.items.map((d) => {
              return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement} {...d} />)
            }

            
              
            )}
          </div>
            
            

          
          <div id='yourIngredients'>
            Your Ingredients<br></br>
              {this.state.clicked}
              
           
          </div>



        </div>



      </div>
    );
  }

}
export default Homepage