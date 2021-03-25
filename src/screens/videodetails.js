import React, { useEffect } from 'react'
import * as Config from '../utils/config.json';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoDetails, fetchAllVidoes } from '../actions/video';
import '../styles/details.scss';

// components
import MiniCard from '../components/video/minicard'
import Subscribe from '../components/video/subscribe'
import Comments from '../components/video/comments'

export default function Videodetails(props) {
  const dispatch = useDispatch();
  const payload = {
    videoId: props.match.params.id
  }
  useEffect(() => {
    dispatch(fetchVideoDetails(payload))
    dispatch(fetchAllVidoes());
  }, []);

  const video = useSelector(state => state.video.videoDetails);
  const videos = useSelector(state => state.video.all)

  return (
    <>
    <div className="video-details">
      <div className="stream">
        <video controls src={`${Config.base}/${video.filePath}`} className="video"></video>
        <div className="video-meta">
          <div className="meta">
            {video.writer && video.writer.avatar
              ? <img src={video.writer.avatar} alt="avatar" className="avatar" />
              : <img src={require('../assets/images/avatar.png').default} alt="avatar" className="avatar" />
            }
            <h1>{video.title}</h1>
            <p className="description">{video.description}.</p>
          </div>
          <div className="actions">
            <Subscribe userTo={video.writer && video.writer._id}/>
          </div>
        </div>
      </div>
      <div className="recommended">
        {videos.map((video, i) => <MiniCard key={i} video={video} />)}
      </div>
      </div>
      <Comments videoId={video._id} />
      </>
  )
}
