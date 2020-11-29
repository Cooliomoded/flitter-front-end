import { render } from '@testing-library/react'
import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

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

class UserNavBar extends Component {

    handleLogout = () => {
        localStorage.clear()
    }

    render(){
        return(
            <div className='nav-bar'>
                <NavLink className='navlink' to='/profile' style={link} activeStyle={clickedLink}>Profile</NavLink>
                <NavLink className='navlink' to='/my-stories' style={link} activeStyle={clickedLink}>My Stories</NavLink>
                <NavLink className='navlink' to='/write' style={link} activeStyle={clickedLink}>New Story</NavLink>
                <NavLink className='navlink' to='/index' style={link} activeStyle={clickedLink}>Stories Index</NavLink>
                <NavLink onClick={this.handleLogout} className='navlink' to='/' style={link} activeStyle={clickedLink}>Log Out</NavLink>
            </div>
        )
    }
}

export default UserNavBar