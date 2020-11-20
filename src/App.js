import React from 'react'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Support from './components/Support'
import './App.css';

class App extends Component {

  handleAuthFetch = (data, request) => {
    fetch(request, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        password_confirmation: data.password_confirmation
      })
    })
  }

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
