import React, { useEffect, useState } from 'react'
import '../../styles/compontents/comments.scss';


import Comment from './comment';


export default function ReplyComment(props) {
  const { comments, postId, parentCommentId } = props;
  const [subReplies, setSubReplies] = useState('');
  const [sub, toggleSub] = useState(false);

  useEffect(() => {
    let val = 0;
    comments.map(c => {
      if (c.responseTo === parentCommentId) {
        return val += 1;
      }
      setSubReplies(val)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="comment-reply">
      {subReplies ? <h3 onClick={() => toggleSub(!sub)}>{sub ? 'Hide' : "Show"} {subReplies} more replies</h3> : ''}
      {sub &&
        comments.map(comment => (
          (comment.responseTo && comment.responseTo === parentCommentId &&
            <Comment key={`sub__${comment._id}`} comment={comment} postId={postId} />)
        ))
      }
    </div>
  )
}
