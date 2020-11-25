import React from 'react'
import { Component } from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'

import Login from './components/Login'
import Signup from './components/Signup'
import Home from './containers/Home'
import Support from './components/Support'
import UserStories from './components/UserStories'

import { fetchStories } from './actions/storyActions'
import { getProfileFetch } from './actions/loginActions'
import './App.css';

class App extends Component {
  componentDidMount(){
    fetchStories()
    getProfileFetch()
  }

  render(){
  return (
    <div className="App">
      <Switch>
     <Route exact path="/" component={Login}/>
     <Route path="/signup" component={Signup} />
     <Route path="/index" render={routerProps => <Home {...routerProps} stories={this.props.stories} />} />
     {/* <Route path='/index/:storyId' component={StoryShow} /> */}
     <Route path="/support" component={Support} />
     <Route path="/my-stories" render={routerProps => <UserStories {...routerProps} user={this.props.user} />} />
     </Switch>
    </div>
  )};
}


const mapStateToProps = state => {
  return {
      stories: state.story,
      user: state.user
  }
}


export default connect (mapStateToProps, { fetchStories, getProfileFetch })(App);
