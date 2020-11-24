import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'

class StoryContainer extends Component {


    componentDidMount() {
        fetch('http:localhost:3000/stories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
}

export default StoryContainer