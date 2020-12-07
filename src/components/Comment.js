import React from 'react'

import ReactQuill from 'react-quill'

const Comment = ({ comment }) => {
    
    const modules = {
        toolbar: [
          false
        ],
    }

    return(
        <div className='comment'>
            <div>
                <ReactQuill
                    key={comment.id}
                    readOnly={true}
                    value={comment.content}
                    modules={modules}
                ></ReactQuill>
            </div>
        </div>
    )
}

export default Comment