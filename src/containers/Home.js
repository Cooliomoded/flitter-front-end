import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import UserNavBar from '../components/UserNavBar'
import GenreNavBar from '../components/GenreNavBar'
import StoryContainer from './StoryContainer'

import { editStory, deleteStory, fetchStories } from '../actions/storyActions'



class Home extends Component {

    componentDidMount() {
        this.props.fetchStories()
    }

    render() {
        return(
            <div>
                <UserNavBar />
                <GenreNavBar></GenreNavBar>
                <StoryContainer></StoryContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stories: state.story,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    editStory: (story) => dispatch(editStory(story)),
    deleteStory: (story) => dispatch(deleteStory(story)),
    fetchStories: () => dispatch(fetchStories())
})

export default connect (mapStateToProps, mapDispatchToProps)(Home)