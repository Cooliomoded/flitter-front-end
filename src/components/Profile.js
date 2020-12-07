import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UserNavBar from './UserNavBar'
import { editUser } from '../actions/userActions'

class Profile extends Component {

    state = {
        editToggle: false
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            username: this.props.user.currentUser.username,
            penname: this.props.user.currentUser.penname ,
            email: this.props.user.currentUser.email,
            profile_pic: this.props.user.currentUser.profile_pic,
            bio: this.props.user.currentUser.bio,  
        })
    }

    submitProfile = () => {
        let user = this.state
        this.props.editUser(user)
        this.setState({
            editToggle: !this.state.editToggle
        })
    }

    editUserProfile = () => {
        this.setState({
            editToggle: !this.state.editToggle
        })
    }

    handleOnChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        console.log(this.props.user)
        return(
            <div>
                <UserNavBar></UserNavBar>
                <div className="under-nav profile">
                    { !this.state.editToggle ? 
                    <div>
                        <h3>{this.state.username}</h3>
                        <h3>{this.state.penname}</h3>
                        <h3>{this.state.email}</h3>
                        <h3>{this.state.profile_pic}</h3>
                        <h3>{this.state.bio}</h3>
                    </div>
                    : null
                    }
                    { this.state.editToggle ?
                        <div>
                            <div className='signup'>
                                <form onSubmit={this.handleOnSubmit}>
                                    <h2>Edit Your Profile:</h2>
                                    <label htmlFor="username">Username:</label>
                                    <input onChange={this.handleOnChange} type="text" id="username" name="username" value={this.state.username} required></input><br></br>
                                    <label htmlFor="penname">Pen Name:</label>
                                    <input onChange={this.handleOnChange} type="text" id="penname" name="penname" value={this.state.penname} required></input><br></br>
                                    <label htmlFor="email">Email:</label>
                                    <input onChange={this.handleOnChange} type="text" id="email" name="email" value={this.state.email} required></input><br></br>
                                    <label htmlFor="profile_pic">Profile Pic URL:</label>
                                    <input onChange={this.handleOnChange} type="text" id="profile_pic" name="profile_pic" value={this.state.profile_pic}></input><br></br>
                                    <label htmlFor="bio">Bio:</label>
                                    <input onChange={this.handleOnChange} type="textarea" id="bio" name="bio" value={this.state.bio} required></input><br></br><br></br>
                                </form>
                            </div>
                        </div>
                        :null
                    }
                    <div className="edit-user-buttons">
                        {this.state.editToggle ? <Link to='/profile'><button onClick={this.submitProfile} >Submit Changes</button></Link> : null}
                        {this.state.editToggle ? null :<button onClick={this.editUserProfile}>Edit User Profile</button>}
                    </div>
                </div>
            </div>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        user: state.login
    }
}

export default connect (mapStateToProps, { editUser })(Profile)