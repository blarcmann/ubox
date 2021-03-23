import React, { useEffect } from 'react'
import * as Config from '../utils/config.json';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoDetails } from '../actions/video';
import '../styles/details.scss';

export default function Videodetails(props) {
  const dispatch = useDispatch();
  const payload = {
    videoId: props.match.params.id
  }
  useEffect(() => {
    dispatch(fetchVideoDetails(payload))
  }, []);

  const video = useSelector(state => state.video.videoDetails);

  return (
    <div className="video-details">
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
        <div className="actions"></div>
      </div>
    </div>
  )
}
