import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: '#6b685f',
    textDecoration: 'none',
    color: 'lightgrey',
  }

const clickedLink = {
    background: '#524f45'
  }

class UserNavBar extends Component {

    handleLogout = () => {
        localStorage.clear()
    }

    render(){
        return(
            <div className='nav-bar'>
                <NavLink className='navlink' to='/profile' style={link} activeStyle={clickedLink}>Profile</NavLink>
                {this.props.handleMyProfile ?
                    <NavLink onClick={this.props.handleMyProfile} className='navlink' to='/my-stories' style={link} activeStyle={clickedLink}>My Stories</NavLink>
                :   <NavLink className='navlink' to='/my-stories' style={link} activeStyle={clickedLink}>My Stories</NavLink>}
                <NavLink className='navlink' to='/my-comments' style={link} activeStyle={clickedLink}>My Comments</NavLink>
                <NavLink className='navlink' to='/write' style={link} activeStyle={clickedLink}>New Story</NavLink>
                {this.props.returnToIndex
                ? <NavLink onClick={this.props.returnToIndex} className='navlink' to='/index' style={link} activeStyle={clickedLink}>Stories Index</NavLink>
                : <NavLink className='navlink' to='/index' style={link} activeStyle={clickedLink}>Stories Index</NavLink>}
                <NavLink onClick={this.handleLogout} className='navlink' to='/' style={link} activeStyle={clickedLink}>Log Out</NavLink>
            </div>
        )
    }
}

export default UserNavBar