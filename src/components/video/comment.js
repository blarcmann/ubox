import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../actions/video'

import Textarea from '../auth/textarea'

export default function Comment(props) {
  const dispatch = useDispatch();
  const { comment, allowReplies } = props;
  const [showingform, setShowingform] = useState(false)
  const [reply, setReply] = useState('')
  const user = JSON.parse(localStorage.getItem('auth'));

  const onReply = () => {
    const payload = {
      writer: user.userId,
      postId: props.postId,
      responseTo: comment._id,
      content: reply,
    }
    dispatch(addComment(payload));
    setReply('')
    setShowingform(false)
  }


  return (
    <>
      <div className="single-comment">
        <div className="avatar">
          <img src={comment.writer.avatar} alt={comment.writer.name} />
        </div>
        <div className="content">
          <h6>{comment.writer.name}</h6>
          <p>{comment.content}</p>
          <div className="meta">
            {allowReplies && <button onClick={() => setShowingform(!showingform)} className="reply-to">Reply to</button>}
          </div>
        </div>
      </div>
      {allowReplies && showingform &&
        <form onSubmit={onReply}>
          <Textarea rows="5" placeholder="Reply comment" rows="4" value={reply}
            onChange={e => setReply(e.target.value)} />
          <button type="button" onClick={onReply}>Reply</button>
        </form>
      }
    </>
  )
}
