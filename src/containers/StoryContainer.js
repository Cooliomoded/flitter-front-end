import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import StoryCard from '../components/StoryCard'


class StoryContainer extends Component {

    state = {
        toggleReadStory: false
    }

    handleOnClick = () => {
        this.setState({
            toggleReadStory: !this.state.toggleReadStory
        })
    }

    render(){
        const { stories } = this.props
        const renderStories = Object.keys(stories.stories).map(storyId =>
        <div className="story-link">
            <Link onClick={this.handleOnClick} key={storyId} to={`/index/${storyId}`}><StoryCard story={stories.stories[storyId]}></StoryCard></Link>
        </div>
        )

        return(
            <div>
                {!this.state.toggleReadStory ? renderStories : null}
            </div>
        )
    }   
}
export default StoryContainer