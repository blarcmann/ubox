import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment } from '../../actions/video';
import '../../styles/compontents/comments.scss'

import Textarea from '../auth/textarea';
import Submit from '../auth/submit';
import Comment from './comment';
import ReplyComment from './replycomment';

export default function Comments(props) {
  const dispatch = useDispatch();
  const { videoId } = props;
  const user = JSON.parse(localStorage.getItem('auth'));
  const [comment, setComment] = useState('');

  useEffect(() => {
    const payload = {
      postId: videoId
    }
    dispatch(fetchComments(payload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId])

  const comments = useSelector(store => store.video.comments);

  const onsubmit = () => {
    if (user && user.userId) {
      const payload = {
        content: comment,
        writer: user.userId,
        postId: videoId,
      }
      dispatch(addComment(payload))
      setComment('');
    } else {
      alert('login to add comment')
    }
  }


  return (
    <div className="comments">
      <span>{comments.length} replies</span>
      <div className="comments-container">
        {comments.map(comment => (
          (!comment.responseTo &&
            <div key={comment._id}>
              <Comment key={`main__${comment._id}`} comment={comment} postId={videoId} allowReplies />
              <ReplyComment key={`reply${comment._id}`} comments={comments} postId={videoId} parentCommentId ={comment._id} />
            </div>
          )
        ))}
      </div>
      <form>
        <Textarea placeholder="Write some comments" rows="10" value={comment}
          onChange={e => setComment(e.target.value)} />
        <Submit handleClick={onsubmit} label="submit" />
      </form>
    </div>
  )
}
