import React from 'react'
import { Link } from 'react-router-dom'
import StoryCard from '../components/StoryCard'


const StoryContainer = ({stories}) => {
    const renderStories = Object.keys(stories.stories).map(storyId =>
        <div className="story-link">
            <Link key={storyId} to={`/index/${storyId}`}><StoryCard story={stories.stories[storyId]}></StoryCard></Link>
        </div>
        )

        return(
            <div>
                {renderStories}
            </div>
        )
}

export default StoryContainer