import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { fetchLogin, getProfileFetch } from '../actions/loginActions'
import { connect } from 'react-redux'

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white',
  }

const clickedLink = {
    background: 'darkblue'
  }

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount() {
        this.props.getProfileFetch()
    }

    handleOnChange = event => {
        let { name, value } = event.target
        this.setState({
            [name]: value
        })
  
    }

    handleSubmit = event => {
        event.preventDefault()
        let user = this.state
        this.props.fetchLogin(user)
        this.props.history.push('/index')
        this.setState({
            username: '',
            password: ''
        })
    }
    render(){
        // this.props.user ? <Redirect to='/index'/>
    return(
        <div className="not-login">
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <h3>Welcome to Flitter</h3>
                    <h4>The Monthly Short Story Competition</h4>
                    <label htmlFor="username">Username:</label>
                    <input onChange={this.handleOnChange} type="text" id="username" name="username" required></input><br></br>
                    <label htmlFor="password">Password:</label>
                    <input onChange={this.handleOnChange} type="password" id="password" name="password" required></input><br></br><br></br>
                    <input type="submit" id="login-submit" name="login-submit"></input>
                    <NavLink to='/signup' style={link} activeStyle={clickedLink}>
                        Sign Up
                    </NavLink>
                </form>
            </div>
            <h3>Sign Up to Join the Competition!</h3>
        </div>
    )   
}}

const mapStateToProps = (state) => {
    return {
        user: state.login
    }
}

export default connect(mapStateToProps, { fetchLogin, getProfileFetch })(Login)