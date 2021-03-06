import React, { Component } from 'react'

import Comment from './Comment'

import { editStory } from '../actions/storyActions'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class EditStory extends Component {

    state = {
        title: '',
        text: '',
        genres: [],
        genreIds: [],
        updatedGenres: [],
        updatedGenreIds: [],
        storyId: ''
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            title: this.props.stories[this.props.match.params.storyId].title,
            text: this.props.stories[this.props.match.params.storyId].content,
            genres: [...this.props.stories[this.props.match.params.storyId].genres.map(genre => genre.genre)],
            genreIds: [...this.props.stories[this.props.match.params.storyId].genres.map(genre => genre.id)],
            storyId: this.props.stories[this.props.match.params.storyId].id,
            updatedGenres: [...this.props.stories[this.props.match.params.storyId].genres.map(genre => genre.genre)],
            updatedGenreIds: [...this.props.stories[this.props.match.params.storyId].genres.map(genre => genre.id)]
        })
    }

    handleTitleOnChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    handleTextOnChange = (content) => {
        this.setState({ 
            ...this.state,
            text: content
        })
        console.log(this.state)
    }

    addGenre = (event) => {
        let genreId = this.props.genres.genres.find(genre => genre.genre === event.target.value)
        this.setState({
            ...this.state,
            updatedGenreIds: [...this.state.updatedGenreIds, genreId.id],
            updatedGenres: [...this.state.updatedGenres, event.target.value]
        })
    }

    modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }

      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

    removeGenre = (event) => {
        let genreId = this.props.genres.genres.find(genre => genre.genre === event.target.value)
        this.setState({
            ...this.state,
            updatedGenreIds: [...this.state.updatedGenreIds.filter(genre => genre !== genreId.id)],
            updatedGenres: [...this.state.updatedGenres.filter(name => name !== genreId.genre)]
        })
        // console.log(this.state)
    }

    editStory = () => {
        let story = {
                ...this.state
        }
        let removedIds = [...story.genreIds.filter(id => !story.updatedGenreIds.includes(id))]
        let addedIds = [...story.updatedGenreIds.filter(id => !story.genreIds.includes(id))]
        story = {
            ...story,
            removedIds: removedIds,
            addedIds: addedIds
        }
        console.log(story)
        this.props.editStory(story)
        this.setState({
            title: '',
            text: '',
            genres: [],
            genreIds: [],
            updatedGenres: [],
            updatedGenreIds: [],
            storyId: ''
        })
        this.props.handleCardDismount()
    }

    render(){
        const { handleCardDismount } = this.props
        return(
            <div className='under-nav'>
                <div className='quill-title'>
                    <input onChange={this.handleTitleOnChange} type='text' name='title' value={this.state.title}></input>
                </div>

            <div className='quill-surface'>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.handleTextOnChange}
                    theme='snow'
                    modules={this.modules}
                    formats={this.formats}
                >
                </ReactQuill>
            </div>

            <div className="genre-selector">
                <label htmlFor="genre-selector">Story Genre Selector</label>
                <select onChange={this.addGenre} name="genre-selector" id="genre-selector">
                <option>Genres</option>
                {/* {this.props.genres.genres.map(genre => !this.state.genreFilter.includes(genre.genre) ? <option onChange={this.handleChange} value={genre.genre}>{genre.genre}</option> : null)} */}
                {this.props.genres.genres.map(genre =>
                    !this.state.updatedGenres.includes(genre.genre) ? <option key={genre.id} value={genre.genre}>{genre.genre}</option>
                    : null)}
                </select>
            </div>

                <div className='genre-selections'>
                    <p>Story Genres:</p>
                        {this.state.updatedGenres.map(genre =>
                             <button key={"edit-genre" + genre} onClick={this.removeGenre} value={genre}>{genre}</button>
                        )}
                    {this.state.genres.length > 0 ? <p>Click to remove genre from list of genres</p> : null }
                </div>

                <div>
                    {this.state.title.length > 4 ?
                    (this.state.text.length > 20 ?
                    (this.state.updatedGenres.length > 0 ?
                    <Link to='/my-stories' ><button onClick={this.editStory}>Submit Story</button></Link>
                    : null)
                    : null)
                    : null}
                </div>

                <div><br></br><br></br><br></br><br></br><br></br>
                    <Link to='/my-stories' onClick={handleCardDismount}> Return to My Stories </Link>
                </div>

                <div>
                    <h3>Comments</h3>
                    {this.props.stories[this.props.match.params.storyId].comments.map(comment => <Comment comment={comment}></Comment>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
    user: state.login,
    genres: state.genre
    }
}


export default connect(mapStateToProps, { editStory } )(EditStory)