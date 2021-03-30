import React from 'react'
import moment from 'moment';
import * as Config from '../../utils/config.json';
import '../../styles/compontents/video/card.scss';

export default function Minicard(props) {
  const { video } = props;
  const minutes = Math.floor(video.duration / 60);
  const seconds = Math.floor(video.duration - (minutes * 60))
  return (
    <a href={`/video/${video._id}`} className="minicard">
      <div className="thumbnail">
        <img src={`${Config.base}/${video.thumbnail}`} alt={video.title} className="thumbnail" />
        <span className="duration">{minutes}:{seconds}</span>
      </div>
      <div className="meta">
        <h4>{video.title}</h4>
        <div className="others">
          <span className="writer">{video.writer && video.writer.name ? video.writer.name : 'Anonymous black'}</span>
          <div className="views">
            <span>{video.views} views</span>
            <span>{moment(video.createdAt).format('MMM Do YYYY')}</span>
          </div>
        </div>
      </div>
    </a>
  )
}
