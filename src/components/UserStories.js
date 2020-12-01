import React, { Component } from 'react'
import NavBar from './UserNavBar'
import StoryCard from './StoryCard'

import { connect } from 'react-redux'

class UserStories extends Component {
    
    state = {
        userStories : []
    }

    componentDidMount(){
        this.setState({
        })
    }
    render() {
    console.log(this.props.stories.stories)
    console.log(this.props.user.currentUser.stories)
    return(
        <div>
            {/* <NavBar></NavBar>
            {user.currentUser.stories.map(story => {
                return(
                    <StoryCard key={story.id} story={story}></StoryCard>
                )
            })}
             */}
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