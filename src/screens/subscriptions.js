import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionVideos } from '../actions/video';
import '../styles/subscriptions.scss';

// components
import Card from '../components/video/card'


export default function Subscriptions() {
  const dispatch = useDispatch();
  const saveduser = JSON.parse(localStorage.getItem('auth'));
  const payload = {
    userFrom: saveduser.userId
  }

  useEffect(() => {
    dispatch(getSubscriptionVideos(payload))
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
