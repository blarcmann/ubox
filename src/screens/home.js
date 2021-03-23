import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVidoes } from '../actions/video';
import '../styles/home.scss';

// components
import Card from '../components/video/card'

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllVidoes())
  }, []);

  const videos = useSelector(state => state.video.all)
  console.log(videos)

  const renderVideos = () => {
    return videos.map((video, i) => (
      <Card key={i} data={video} />
    ))
  }

  return (
    <div className="home-container">
      <h1>Recommended Videos</h1>
      <div className="videos-container">
        {renderVideos()}
      </div>
    </div>
  )
}
