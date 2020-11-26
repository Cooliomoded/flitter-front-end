import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import UserNavBar from '../components/UserNavBar'
import GenreNavBar from '../components/GenreNavBar'
import StoryContainer from './StoryContainer'
import StoryShow from '../components/StoryShow'

import { editStory, deleteStory, fetchStories } from '../actions/storyActions'
import { fetchGenres } from '../actions/genreActions'
import { getProfileFetch } from '../actions/loginActions'



class Home extends Component {

    componentDidMount() {
        this.props.fetchStories()
        this.props.fetchGenres()
        this.props.getProfileFetch()
    }

    render() {
        return(
            <div>
                <UserNavBar />
                <GenreNavBar></GenreNavBar>
                <div>
                    <StoryContainer stories={this.props.stories}></StoryContainer>
                    <Route path={`${this.props.match.url}/:storyId`} render={routerProps =><StoryShow {...routerProps} stories={this.props.stories}/>}/>
                </div>
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
    fetchStories: () => dispatch(fetchStories()),
    fetchGenres: () => dispatch(fetchGenres()),
    getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect (mapStateToProps, mapDispatchToProps)(Home)