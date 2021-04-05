import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, dislike } from '../../actions/video'
import { DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function LikeDislike(props) {
  const { videoId, video } = props;
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
    dispatch(like(payload));
  }

  const onDislike = () => {
    dispatch(dislike(payload))
  }

  console.log(liked, disliked)

  return (
    <div className="like-dislike">
      <div className="Like">
        <LikeFilled onClick={onLike} className={liked ? 'liked' : null} />
        <span>{likes && likes.length > 0 ? likes.length : 0}</span>
      </div>

      <div className="Like">
        <DislikeFilled onClick={onDislike} className={disliked ? 'dislike' : null} />
        <span>{dislikes && dislikes.length > 0 ? dislikes.length : 0}</span>
      </div>

    </div>
  )
}
