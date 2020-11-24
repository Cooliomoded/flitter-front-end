import React from 'react'
import { Component } from 'react'

import UserNavBar from '../components/UserNavBar'
import GenreNavBar from '../components/GenreNavBar'

class Home extends Component {
    
    render() {
        return(
            <div>
                {this.props.token ? <UserNavBar /> : null}
                <GenreNavBar></GenreNavBar>
            </div>
        )
    }
}

export default (Home)