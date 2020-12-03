import React, { Component } from 'react'

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

    async componentDidMount() {
        await this.props.match
        await this.props.stories
        await this.props.handleCardDismount
        console.log(this.props.stories[this.props.match.params.storyId])
        console.log(this.props.stories[this.props.match.params.storyId].genres.map(genre => genre.genre))
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
        console.log(this.state)
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
        console.log(genreId)
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
        console.log(`If no Id's are left on this list, don't need to remove any Id's ${removedIds}`)
        let addedIds = [...story.updatedGenreIds.filter(id => !story.genreIds.includes(id))]
        console.log(`What I think are the Ids that need to be added ${addedIds}`)
        story = {
            ...story,
            removedIds: removedIds,
            addedIds: addedIds
        }
        console.log(story)
        this.props.editStory(story)
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
                {/* {this.props.genres.genres.map(genre => !this.state.genreFilter.includes(genre.genre) ? <option onChange={this.handleChange} value={genre.genre}>{genre.genre}</option> : null)} */}
                {this.props.genres.genres.map(genre =>
                    !this.state.updatedGenres.includes(genre.genre) ? <option key={genre.id} value={genre.genre}>{genre.genre}</option> : null)}
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
                    {this.state.title.length > 6 ?
                    (this.state.text.length > 20 ?
                    (this.state.genres.length > 0 ?
                    <button onClick={this.editStory}>Submit Story</button>
                    : null)
                    : null)
                    : null}
                </div>

                <div><br></br><br></br><br></br><br></br><br></br>
                    <Link to='/my-stories' onClick={handleCardDismount}> Return to My Stories </Link>
                </div>

                <div>
                    <h3>Comments</h3>
                    {this.props.stories[this.props.match.params.storyId].comments.map(comment => <p>{comment.content}</p>)}
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