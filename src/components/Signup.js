import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'

import { createUser } from '../actions/userActions'

class SignUp extends Component {

    store = {
        username: '',
        penname: '',
        email: '',
        profile_pic: '',
        bio: '',
        password: '',
        password_confirmation: ''
    }

    handleOnChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleOnSubmit = event => {
        event.preventDefault()
        let user = { ...this.state }
        this.props.createUser(user)
        this.props.history.push('/index')
        this.setState({
            username: '',
            penname: '',
            email: '',
            profile_pic: '',
            bio: '',
            password: '',
            password_confirmation: ''
        })
    }
    
    render() {
    return(
        <div className='not-signup'>
            <NavLink to='/index'>
                Story Index
            </NavLink>
            <div className='signup'>
                <form onSubmit={this.handleOnSubmit}>
                    <h2>Sign Up:</h2>
                    <label htmlFor="username">Username:</label>
                    <input onChange={this.handleOnChange} type="text" id="username" name="username" placeholder="Michael Toncreigh" required></input><br></br>
                    <label htmlFor="penname">Pen Name:</label>
                    <input onChange={this.handleOnChange} type="text" id="penname" name="penname" placeholder="Bruce Acewill" required></input><br></br>
                    <label htmlFor="email">Email:</label>
                    <input onChange={this.handleOnChange} type="text" id="email" name="email" placeholder="email@address.com" required></input><br></br>
                    <label htmlFor="profile_pic">Profile Pic URL:</label>
                    <input onChange={this.handleOnChange} type="text" id="profile_pic" name="profile_pic"></input><br></br>
                    <label htmlFor="bio">Bio:</label>
                    <input onChange={this.handleOnChange} type="textarea" id="bio" name="bio" placeholder="Bio" required></input><br></br><br></br>
                    <label htmlFor="password">Password:</label>
                    <input onChange={this.handleOnChange} type="password" id="password" name="password" placeholder="*******" required></input><br></br>
                    <label htmlFor="password_confirmation">Confirm Password:</label>
                    <input onChange={this.handleOnChange} type="password" id="password_confirmation" name="password_confirmation" placeholder="*******" required></input><br></br>
                    <input type="submit" id="login-submit" name="login-submit"></input>
                </form>
            </div>
            Forgot you were already a user?<br></br>
            <NavLink to='/'>
                Login
            </NavLink><br></br>
            Forgot your username or password?<br></br>
            <NavLink to='/support'>Account Support</NavLink>
            </div>
        )
    }
}
export default connect(null, { createUser }) (SignUp)