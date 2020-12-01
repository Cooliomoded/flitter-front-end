import React, { Component } from 'react'
import NavBar from './UserNavBar'
import StoryCard from './StoryCard'

import { connect } from 'react-redux'

class UserStories extends Component {
    
    state = {
        userStories: []
    }

    componentDidMount(){
        let userStoryArray = this.props.user.currentUser.stories.map(story => this.props.stories.stories.find(userStory => userStory.id === story.id))
        console.log(userStoryArray)
        this.setState({
            userStories: [...userStoryArray]
        })
    }
    render() {
        console.log(this.state)
    // console.log(this.props.stories.stories)
    // console.log(this.props.user.currentUser.stories)
    return(
        <div>
            <NavBar></NavBar>
            {this.state.userStories.map(story => {
                return(
                    <StoryCard key={story.id} story={story}></StoryCard>
                )
            })}
            
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        stories: state.story
    }
}

export default connect(mapStateToProps)(UserStories)