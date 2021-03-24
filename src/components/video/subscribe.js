import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribers, subscribe, unsubscribe } from '../../actions/video';


export default function Subscribe(props) {
  const dispatch = useDispatch();
  const { userTo } = props;
  const user = JSON.parse(localStorage.getItem('auth'))
  const payload = { userTo: userTo, userFrom: user.userId };

  useEffect(() => {
    dispatch(getSubscribers(payload))
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
      <button onClick={handleSubscription}>{subscribers}{subscribed ? 'Subscribers' : 'Subscribe'}</button>
    </div>
  )
}