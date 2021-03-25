import React, { useEffect, useState } from 'react'
import '../../styles/compontents/comments.scss';


import Comment from './comment';


export default function ReplyComment(props) {
  const { comments, postId, parentCommentId } = props;
  const [subReplies, setSubReplies] = useState('')

  useEffect(() => {
    let val = 0;
    comments.map(c => {
      if (c.responseTo === parentCommentId) {
        val += 1;
      }
      setSubReplies(val)
    })
  })

  return (
    <div className="comment-reply">
      {subReplies ? <h3 onClick={() => alert('hello!')}>Show {subReplies} more replies</h3> : ''}
      {comments.map(comment => (
        (comment.responseTo && comment.responseTo === parentCommentId &&
          <Comment key={`sub__${comment._id}`} comment={comment} postId={postId} />)
      ))}
    </div>
  )
}
