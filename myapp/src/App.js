import React from 'react';
import './App.css';
import Data from './routes/Data'
import Homepage from './routes/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {

  return (
    
    <Router>
      
      <Switch>
        <Route path='/data' component={Data} />
        <Route path='/' component={Homepage} />
      </Switch>
    </Router>
  )
}

export default App