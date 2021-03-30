import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribers, subscribe, unsubscribe } from '../../actions/video';


export default function Subscribe(props) {
  const dispatch = useDispatch();
  const { userTo } = props;
  const user = JSON.parse(localStorage.getItem('auth'))
  const payload = { userTo: userTo, userFrom: user && user.userId };

  useEffect(() => {
    if (user && user.userId) {
      dispatch(getSubscribers(payload))
    }
  })

  const subscribers = useSelector(state => state.video.subscribers)
  const subscribed = useSelector(state => state.video.subscribed)

  const handleSubscription = () => {
    if (subscribed) {
      dispatch(unsubscribe(payload))
    } else {
      dispatch(subscribe(payload))
    }
  }

  return (
    <div>
      <button className="sub-btn" onClick={handleSubscription}>{subscribers}&nbsp;{subscribed ? 'Subscribers' : 'Subscribed'}</button>
    </div>
  )
}
