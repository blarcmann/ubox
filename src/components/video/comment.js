import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../actions/video'

import Textarea from '../auth/textarea'
// import LikeDislike from './likeDislike'

export default function Comment(props) {
  const dispatch = useDispatch();
  const { comment, allowReplies } = props;
  const [showingform, setShowingform] = useState(false)
  const [reply, setReply] = useState('')
  const user = JSON.parse(localStorage.getItem('auth'));

  const onReply = () => {
    if (user && user.userId) {
      const payload = {
        writer: user.userId,
        postId: props.postId,
        responseTo: comment._id,
        content: reply,
      }
      dispatch(addComment(payload));
      setReply('')
      setShowingform(false)
    } else {
      alert('login to reply comment')
    }
  }

  return (
    <>
      <div className="single-comment">
        <div className="avatar">
          {comment.writer && comment.writer.avatar
            ? <img src={comment.writer.avatar} alt="avatar" className="avatar" />
            : <img src={require('../../assets/images/misc/avatar.png').default} alt="avatar" className="avatar" />
          }
        </div>
        <div className="content">
          <h6 className="name">{comment.writer.name}</h6>
          <p className="comment">{comment.content}</p>
          {/* <LikeDislike comment commentId={comment._id} /> */}
          <div className="meta">
            {allowReplies && <button onClick={() => setShowingform(!showingform)} className="reply-to">Reply to</button>}
          </div>
        </div>
      </div>
      {allowReplies && showingform &&
        <form onSubmit={onReply} className="reply-form">
          <Textarea placeholder="Reply comment" rows="4" value={reply}
            onChange={e => setReply(e.target.value)} />
          <button type="button" className="comment-btn right plain" onClick={onReply}>Reply</button>
          <button type="button" onClick={() => setShowingform(!showingform)} className="comment-btn right plain cancel">
            Cancel
          </button>
        </form>
      }
    </>
  )
}
