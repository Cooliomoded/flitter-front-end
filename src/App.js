import React from 'react'
import { Component } from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'

import Login from './components/Login'
import Signup from './components/Signup'
import Home from './containers/Home'
import Support from './components/Support'

import { fetchStories } from './actions/storyActions'
import { getProfileFetch } from './actions/loginActions'
import './App.css';

class App extends Component {
  componentDidMount(){

    fetch('http://localhost:3000/stories')
    .then(res => res.json())
    .then(data => console.log(data))

    fetchStories()
    getProfileFetch()
  }

  render(){
  return (
    <div className="App">
      <Switch>
     <Route exact path="/" component={Login}/>
     <Route path="/signup" component={Signup} />
     <Route path="/home" component={Home} />
     <Route path="/support" component={Support} />
     </Switch>
    </div>
  )};
}

export default connect (null, { fetchStories, getProfileFetch })(App);
