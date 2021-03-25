import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLikes, getDislikes, upLike, downLike, initDislike, upDislike } from '../../actions/video'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function LikeDislike(props) {
  const { videoId, commentId } = props;
  const [likeAction, setLikeAction] = useState('');
  const [dislikeAction, setDislikeAction] = useState('');
  const user = JSON.parse(localStorage.getItem('auth'));
  const dispatch = useDispatch();

  let payload = {
    userId: user && user.userId
  }

  if (props.video) {
    payload = { ...payload, videoId: videoId }
  } else {
    payload = { ...payload, commentId: commentId }
  }

  useEffect(() => {
    dispatch(getLikes(payload))
    dispatch(getDislikes(payload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const likes = useSelector(store => store.video.likes)
  const dislikes = useSelector(store => store.video.dislikes)

  // const checkLiked = () => {
  //   likes.map(like => {
  //     if (like.userId === user.userId) {
  //       setLikeAction('liked')
  //     }
  //   })
  // }

  // const checkDisliked = () => {
  //   likes.map(like => {
  //     if (like.userId === user.userId) {
  //       setDislikeAction('disliked')
  //     }
  //   })
  // }

  const onLike = () => {
    if (likeAction === null) {
      dispatch(upLike(payload));
      setLikeAction('liked')
      setDislikeAction('')
    } else {
      dispatch(downLike(payload));
    }
  }

  const onDislike = () => {
    if (dislikeAction === null) { 
      dispatch(initDislike(payload))
      setDislikeAction('disliked')
      setLikeAction('')
    } else {
      dispatch(upDislike(payload))
    }
  }

  return (
    <div className="like-dislike">

      <div className="Like">
        {likeAction === 'liked'
          ? <LikeFilled onClick={onLike} />
          : <LikeOutlined onClick={onLike} />
        }
        <span>{likes && likes.length > 0 ? likes.length : 0}</span>
      </div>

      <div className="Like">
        {dislikeAction === 'disliked'
          ? <DislikeFilled onClick={onDislike} />
          : <DislikeOutlined onClick={onDislike} />
        }
        <span>{dislikes && dislikes.length > 0 ? dislikes.length : 0}</span>
      </div>

    </div>
  )
}
