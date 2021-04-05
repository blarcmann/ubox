import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { like, dislike, fetchVideoDetails } from '../../actions/video'
import { DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function LikeDislike(props) {
  const { videoId, video } = props;
  const [liked, setLiked] = useState();
  const [disliked, setDisliked] = useState(false);
  const user = JSON.parse(localStorage.getItem('auth'));
  const dispatch = useDispatch();

  const payload = {
    userId: user && user._id,
    videoId: videoId
  }

  const likes = video.likes;
  const dislikes = video.dislikes;

  // useEffect(() => {
  //   checkLiked(user._id)
  //   checkDisliked(user._id)
  // }, [likes, dislikes])

  const onLike = () => {
    dispatch(like(payload));
  }

  const onDislike = () => {
    dispatch(dislike(payload))
  }

  const checkLiked = (userId) => {
    const cl = likes.filter(like => like.toString() === userId.toString());
    if (cl) setLiked('green')
  }

  const checkDisliked = (userId) => {
    const dl = likes.filter(like => like.toString() === userId.toString());
    setDisliked(dl)
  }

  return (
    <div className="like-dislike">
      <div className="Like">
        <LikeFilled onClick={onLike} color={liked} />
        <span>{likes && likes.length > 0 ? likes.length : 0}</span>
      </div>

      <div className="Like">
        <DislikeFilled onClick={onDislike} />
        <span>{dislikes && dislikes.length > 0 ? dislikes.length : 0}</span>
      </div>

    </div>
  )
}
