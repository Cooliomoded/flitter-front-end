import React from 'react'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Support from './components/Support'
import './App.css';

class App extends Component {

  render(){
    console.log(this.props)
  return (
    <div className="App">
     <Route exact path="/" component={Login}/>
     <Route path="/signup" component={Signup} />
     <Route path="/home" component={Home} />
     <Route path="/support" component={Support} />
    </div>
  )};
}

export default App;
