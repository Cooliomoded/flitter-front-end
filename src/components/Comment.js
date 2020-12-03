import React from 'react'

import ReactQuill from 'react-quill'

const Comment = ({ comment }) => {
    console.log(comment)
    
    const modules = {
        toolbar: [
          false
        ],
    }

    return(
        <div>
            <ReactQuill
                readOnly='true'
                value={comment.content}
                modules={modules}
            ></ReactQuill>
        </div>
    )
}

export default Comment