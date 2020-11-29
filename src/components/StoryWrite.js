import React, { Component } from 'react'

import NavBar from './UserNavBar'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class StoryWrite extends Component {

    state = {
        text: ''
    }

    handleOnChange = (event) => {
        console.log(this.state)
        console.log(event)
        this.setState({ text: event })
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

    render() {
    return(
        <div className='quill-container'>
            <NavBar></NavBar>
            <ReactQuill
                value={this.state.text}
                onChange={this.handleOnChange}
                theme='snow'
                modules={this.modules}
                formats={this.formates}
            >
                <div className='my-editing-area'></div>    
            </ReactQuill>
        </div>
    )}
}



export default StoryWrite