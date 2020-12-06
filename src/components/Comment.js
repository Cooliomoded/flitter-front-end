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
                key={comment.id}
                readOnly={true}
                value={comment.content}
                modules={modules}
            ></ReactQuill>
        </div>
    )
}

export default Comment