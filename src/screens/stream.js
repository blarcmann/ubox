import React, { useEffect } from 'react'
import moment from 'moment'
import * as Config from '../utils/config.json';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoDetails, fetchAllVidoes, updateViewsCount } from '../actions/video';
import '../styles/stream.scss';

// components
import MiniCard from '../components/video/minicard'
import Subscribe from '../components/video/subscribe'
import Comments from '../components/video/comments'
import LikeDislike from '../components/video/likeDislike'
import WithNav from '../hoc/withNav'

export default function Stream(props) {
  const dispatch = useDispatch();
  const payload = {
    videoId: props.match.params.id
  }
  useEffect(() => {
    dispatch(updateViewsCount(payload))
    dispatch(fetchVideoDetails(payload))
    dispatch(fetchAllVidoes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const video = useSelector(state => state.video.videoDetails);
  const videos = useSelector(state => state.video.all);

  return (
    <WithNav>
      <div className="stream-container">
        <div className="streaming">
          <div className="video-cover">
            <video controls src={`${Config.base}/${video.filePath}`} className="video"></video>
          </div>
          <div className="stream-meta">
            <div className="meta">
              <div className="stream-tile">
                <h1 className="title">{video.title}</h1>
                <div className="views-date">
                  <span>{`${video && video.views} views`}</span>
                  <span>{moment(video && video.createdAt).format('MMM Do YYYY')}</span>
                </div>
              </div>
              <div className="actions">
                <LikeDislike video={video} videoId={video._id} />
              </div>
            </div>
            <div className="writer">
              <div className="creator">
                {video && video.writer && video.writer.avatar
                  ? <img src={video.writer.avatar} alt="avatar" className="avatar" />
                  : <img src={require('../assets/images/misc/avatar.png').default} alt="avatar" className="avatar" />
                }
                <span>{video.writer && video.writer.username}</span>
              </div>
              <Subscribe userTo={video.writer && video.writer._id} />
            </div>
            <p className="description">{video.description}.</p>
          </div>
          <Comments videoId={video._id} />
        </div>
        <div className="recommended">
          <h3 className="title">Recommended</h3>
          {videos.map((video, i) => <MiniCard key={i} video={video} />)}
        </div>
      </div>
    </WithNav>
  )
}
