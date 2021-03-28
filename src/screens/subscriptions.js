import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionVideos } from '../actions/video';
import '../styles/home.scss';

// components
import Card from '../components/video/card'
import WithNav from '../hoc/withNav';


export default function Subscriptions() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('auth'));
  const payload = {
    userFrom: user && user.userId
  }

  useEffect(() => {
    if (user && user.userId) {
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
    <WithNav>
      <div className="subscriptions">
        <h2 className="title">My subscriptions</h2>
        <div className="videos-container">
          {renderVideos()}
        </div>
      </div>
    </WithNav>
  )
}
