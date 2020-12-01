import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StoryCard from '../components/StoryCard'


class StoryContainer extends Component {

    state = {
        toggleReadStory: false
    }

    componentDidMount(){
        this.setState({
            toggleReadStory: false
        })
    }

    handleOnClick = () => {
        this.setState({
            toggleReadStory: !this.state.toggleReadStory
        })
    }

    handleCardDismount = () => {
        this.setState({
            toggleReadStory: false
        })
    }

    render(){
        const { storiesFromState } = this.props
        const renderStories = Object.keys(storiesFromState.stories).map(storyId =>
        <div className="story-link">
            <Link onClick={this.handleOnClick} key={storyId} to={`/index/${storyId}`}><StoryCard story={storiesFromState.stories[storyId]}></StoryCard></Link>
        </div>
        )

        return(
            <div>
                {!this.state.toggleReadStory ? renderStories : null}
            </div>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        storiesFromState: state.story
    }
} 
export default connect(mapStateToProps)(StoryContainer)
