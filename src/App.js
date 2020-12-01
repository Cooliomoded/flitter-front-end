import React from 'react'
import { Component } from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'

import Login from './components/Login'
import Signup from './components/Signup'
import Home from './containers/Home'
import Support from './components/Support'
import Profile from './components/Profile'
import UserStories from './components/UserStories'
import StoryWrite from './components/StoryWrite'

import { fetchStories } from './actions/storyActions'
import { getProfileFetch } from './actions/loginActions'
import './App.css';

class App extends Component {
  componentDidMount(){
    this.props.getProfileFetch()
    this.props.fetchStories()
  }

  render(){
  return (
    <div className="App">
      <Switch>
     <Route exact path="/" component={Login}/>
     <Route path="/signup" component={Signup} />
     <Route path="/profile" component={Profile} />
     <Route path="/index" render={routerProps => <Home {...routerProps} stories={this.props.stories} />} />
     {/* <Route path='/index/:storyId' component={StoryShow} /> */}
     <Route path="/support" component={Support} />
     <Route path="/my-stories" render={routerProps => <UserStories {...routerProps} user={this.props.user} />} />
     <Route path="/write" component={StoryWrite} />
     </Switch>
    </div>
  )};
}


const mapStateToProps = state => {
  return {
      stories: state.story,
      user: state.login
  }
}


export default connect (mapStateToProps, { fetchStories, getProfileFetch })(App);
