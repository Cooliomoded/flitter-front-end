import React, { Component } from 'react'
import NavBar from './UserNavBar'
import StoryCard from './StoryCard'
import EditStory from './EditStory'

import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

class UserStories extends Component {
    
    state = {
        userStories: [],
        toggleEditStory: false
    }

    componentDidMount(){
        if (this.props.user.currentUser.stories && this.props.user.currentUser.stories.length > 0){
        let userStoryArray = this.props.user.currentUser.stories.map(
            story => this.props.stories.stories.find(
                userStory => userStory.id === story.id))
        this.setState({
            userStories: [...userStoryArray]
        })
        }
    }

    handleOnClick = () => {
        this.setState({
            toggleEditStory: !this.state.toggleReadStory
        })
    }

    handleCardDismount = () => {
        this.setState({
            toggleEditStory: false
        })
    }

    render() {
        const { userStories } = this.state
        const storyIds = userStories.map(story => story.id)
        const renderStories = storyIds.map(storyId =>
        <div className="under-nav story-link" key={'edit-story-link' + storyId}>
            <Link className="edit-link" onClick={this.handleOnClick} to={`/my-stories/${storyId - 1}`}><StoryCard story={this.props.stories.stories[storyId - 1]}></StoryCard></Link>
        </div>
        )
    // console.log(this.props.stories.stories)
    // console.log(this.props.user.currentUser.stories)
        return(
            <div>
                <NavBar handleMyProfile={this.handleCardDismount}></NavBar>
                {!this.state.toggleEditStory ? renderStories : <h3>Submit Some Stories!</h3>}
                <Route path={`${this.props.match.url}/:storyId`} render={routerProps =><EditStory {...routerProps} handleCardDismount={this.handleCardDismount} stories={this.props.stories.stories}/>}/>
            </div>
            
        )
        }
}

const mapStateToProps = (state) => {
    return {
        stories: state.story,
        user: state.login
    }
}

export default connect(mapStateToProps)(UserStories)