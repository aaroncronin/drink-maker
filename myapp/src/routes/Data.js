import React, {Component} from 'react';

class Data extends Component {
    state = {items: []}
    
    componentDidMount() {
      document.title = 'Aaron'
      fetch('/data')
      .then(res => res.json())
      .then(items => this.setState({items}))
      
    }
   
    render() {
      return (
        
        <div className="App">
          <h1>All Drinks</h1>
          
            {this.state.items.map(d => 
              <div class='gallery'>
                
                <img src={d.image}></img>
                <div>{d.name}</div>

              
              </div>
              
              )}

        </div>
      );
    }
    
  }
  export default Data