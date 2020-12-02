import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import StoryCard from '../components/StoryCard'
import GenreNavBar from '../components/GenreNavBar'
import StoryShow from '../components/StoryShow'


class StoryContainer extends Component {

    state = {
        toggleReadStory: false,
        genreFilter: [],
        filteredStories: []
    }

    async componentDidMount(){
        await this.props.storiesFromState
        await this.setState({
            toggleReadStory: false,
            filteredStories: this.props.storiesFromState.stories
        })
        console.log(this.state)
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

    handleAddGenreFilter = (event) => {
        console.log(event.target.value)
        console.log(this.state.filteredStories.length > 0 ? this.state.filteredStories[0].genres[0] : null)
        console.log(this.state.filteredStories.filter(story => story.genres.some(genre => genre.genre === event.target.value)))
        this.setState({
            ...this.state,
            genreFilter: [...this.state.genreFilter, event.target.value],
            filteredStories: [...this.state.filteredStories.filter(story => story.genres.some(genre => genre.genre === event.target.value))],
        })
        console.log(this.state)
    }

    handleRemoveGenreFilter = (event) => {
        console.log(event.target.value)
        let newFilter = [...this.state.genreFilter.filter(genre => genre !== event.target.value)]
        let allStories = [...this.props.storiesFromState.stories]
        console.log(newFilter)
        newFilter.forEach(filter => allStories = allStories.filter(story => story.genres.some(genre => genre.genre === filter)))
        console.log(allStories)
        this.setState({
            ...this.state,
            filteredStories: [...allStories],
            genreFilter: [...newFilter]
        })
        console.log(this.state)
    }

    render(){

        const { filteredStories } = this.state
        const renderStories = Object.keys(filteredStories).map(storyId =>
        <div className="story-link" key={'story-link' + storyId}>
            <Link onClick={this.handleOnClick} to={`/index/${storyId}`}><StoryCard story={filteredStories[storyId]}></StoryCard></Link>
        </div>
        )

        return(
            <div>
                <div className='navbar-container'>
                    <GenreNavBar genreFilter={this.state.genreFilter} handleAddGenreFilter={this.handleAddGenreFilter} handleRemoveGenreFilter={this.handleRemoveGenreFilter}></GenreNavBar>
                </div>
                <div className='story-container'>
                    {!this.state.toggleReadStory ? renderStories : null}
                </div>
                <Route path={`${this.props.match.url}/:storyId`} render={routerProps =><StoryShow {...routerProps} handleCardDismount={this.handleCardDismount} stories={this.props.stories}/>}/>
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
