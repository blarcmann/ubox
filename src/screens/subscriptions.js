import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionVideos } from '../actions/video';
import '../styles/subscriptions.scss';

// components
import Card from '../components/video/card'


export default function Subscriptions() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('auth'));
  const payload = {
    userFrom: user && user.userId
  }

  useEffect(() => {
    if (user && user.id) {
      dispatch(getSubscriptionVideos(payload))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subVideos = useSelector(state => state.video.subVideos)

  const renderVideos = () => {
    return subVideos.map((video, i) => (
      <Card key={i} data={video} />
    ))
  }


  return (
    <div className="subscriptions">
      <h1>Subscribed </h1>
      <div className="videos-container">
        {renderVideos()}
      </div>
    </div>
  )
}
