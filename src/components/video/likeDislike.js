import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, dislike } from '../../actions/video'
import { DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function LikeDislike(props) {
  const { videoId, video } = props;
  const [lk, setLk] = useState(false);
  const [dlk, setDlk] = useState(false);
  const user = JSON.parse(localStorage.getItem('auth'));
  const dispatch = useDispatch();

  const payload = {
    userId: user && user._id,
    videoId: videoId
  }

  const likes = video.likes;
  const dislikes = video.dislikes;
  const liked = useSelector(state => state.video.liked);
  const disliked = useSelector(state => state.video.disliked);

  const onLike = () => {
    setDlk(false);
    setLk(true)
    dispatch(like(payload));
  }

  const onDislike = () => {
    setLk(false)
    setDlk(true);
    dispatch(dislike(payload))
  }

  return (
    <div className="like-dislike">
      <div className={liked || lk ? 'dl liked' : 'dl'}>
        <LikeFilled onClick={onLike} />
        <span className="number">{likes && likes.length > 0 ? `${likes.length}k` : 0}</span>
      </div>

      <div className={disliked || dlk ? 'dl disliked' : 'dl'}>
        <DislikeFilled onClick={onDislike} />
        <span className="number">{dislikes && dislikes.length > 0 ? dislikes.length : 0}</span>
      </div>

    </div>
  )
}
