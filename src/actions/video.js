import axios from 'axios';
import { Loading } from './ui';
import * as Types from '../constants/types';
import * as Config from '../utils/config.json';



export const createPath = (payload) => (dispatch) => {
  dispatch(Loading(true));

  const headers = {
    'content-type': 'multipart/form-data'
  }

  axios
    .post(`${Config.base_url}/video/uploadfile`, payload, { headers })
    .then((response) => {
      const { data } = response;
      if (response.data.success) {
        dispatch({ type: Types.VIDEOPATH, payload: data });
        dispatch(generateThumbnail(data))
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to preview video')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("vid and thumnail path path error", error)
    })
}

export const generateThumbnail = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/video/thumbnail`, payload)
    .then((response) => {
      console.log('response', response);
      const { data } = response;
      if (response.data.success) {
        dispatch({ type: Types.GEN_THUMBNAILS, payload: data });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to save video')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("thumbnail error", error)
    })
}

export const uploadVideo = (payload, props) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/video/uploadvideo`, payload)
    .then((response) => {
      console.log('upload video response', response);
      if (response.data.success) {
        alert('Upload Success');
        dispatch(Loading(false));
        props.history.push('/');
      } else {
        dispatch(Loading(false));
        alert('failed to upload video')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("upload error", error)
    })
}

export const fetchAllVidoes = () => (dispatch) => {
  dispatch(Loading(true));

  axios
    .get(`${Config.base_url}/video/all`)
    .then((response) => {
      const { videos } = response.data;
      if (response.data.success) {
        dispatch({ type: Types.FETCH_ALL_VIDEOS, payload: videos });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to load all videos')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to load all videos", error)
    })
}

export const fetchVideoDetails = (payload) => (dispatch) => {
  dispatch(Loading(true));
  axios
    .post(`${Config.base_url}/video/getvideo`, payload)
    .then((response) => {
      const { video } = response.data;
      if (response.data.success) {
        dispatch({ type: Types.FETCH_VIDEO_DETAILS, payload: video });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to load video')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to load video", error)
    })
}