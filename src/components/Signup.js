import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'

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
            <NavLink to='/home'>
                Story Index
            </NavLink>
            <div className='signup'>
                <form>
                    <h2>Sign Up:</h2>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Michael Toncreigh"></input><br></br>
                    <label htmlFor="penname">Pen Name:</label>
                    <input type="text" id="penname" name="penname" placeholder="Bruce Acewill"></input><br></br>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" placeholder="email@address.com"></input><br></br>
                    <label htmlFor="profile_pic">Profile Pic URL:</label>
                    <input type="text" id="profile_pic" name="profile_pic"></input><br></br>
                    <label htmlFor="bio">Bio:</label>
                    <input type="text" id="bio" name="bio" placeholder="Bio"></input><br></br><br></br>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="*******"></input><br></br>
                    <label htmlFor="password_confirmation">Confirm Password:</label>
                    <input type="password" id="password_confirmation" name="password_confirmation" placeholder="*******"></input><br></br>
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
export default SignUp