import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = ( { handleLogin, handleSignUp } ) => {
    
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
    
    return(
        <div className="not-login">
            <NavLink className="navlink" to='/home' style={link} activeStyle={clickedLink}>
               Stories Index
            </NavLink>
            <div className="login">
                <form onSubmit={handleLogin}>
                    <h3>Welcome to Flitter</h3>
                    <h4>The Monthly Short Story Competition</h4>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required></input><br></br>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required></input><br></br><br></br>
                    <input type="submit" id="login-submit" name="login-submit"></input>
                    <NavLink to='/signup' style={link} activeStyle={clickedLink}>
                        Sign Up
                    </NavLink>
                </form>
            </div>
            <h3>Sign Up to Join the Competition!</h3>
        </div>
    )   
}
export default Login