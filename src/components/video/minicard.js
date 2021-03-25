import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as Config from '../../utils/config.json';
import '../../styles/compontents/video/card.scss';

export default function Minicard(props) {
  const { video } = props;
  const minutes = Math.floor(video.duration / 60);
  const seconds = Math.floor(video.duration - (minutes * 60))
  return (
    <Link to={`/video/${video._id}`} className="minicard">
      <div className="thumbnail">
        <img src={`${Config.base}/${video.thumbnail}`} alt={video.title} className="thumbnail" />
      </div>
      <div className="meta">
        <h4>{video.title}</h4>
        <span>{video.writer && video.writer.name ? video.writer.name : 'Anonymous black'}</span>
        <span>{video.views} views</span>
        <span>{minutes}:{seconds}</span>
      </div>
    </Link>
  )
}
