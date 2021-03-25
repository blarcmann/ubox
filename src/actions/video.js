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

export const getSubscribers = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/sub/subNumber`, payload)
    .then((response) => {
      const { subscribers } = response.data;
      if (response.data.success) {
        dispatch({ type: Types.GET_SUBSCRIBERS, payload: subscribers });
        dispatch(updateSubscription(payload))
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to load all sub')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to load all videos", error)
    })
}

export const updateSubscription = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/sub/subscribed`, payload)
    .then((response) => {
      const { subscribed } = response.data;
      if (response.data.success) {
        dispatch({ type: Types.ACCOUNT_SUBSCRIPTION, payload: subscribed });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to load all sub')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to subscribe", error)
    })
}

export const subscribe = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/sub/subscribe`, payload)
    .then((response) => {
      console.log('subscribe response', response);
      if (response.data.success) {
        dispatch({ type: Types.SUBSCRIBED, payload: response.data });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to subscribe')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to subscribe", error)
    })
}

export const unsubscribe = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/sub/unsubscribe`, payload)
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: Types.UNSUBSCRIBED, payload: response.data });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to unsubscribe')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("unsubscribe error", error)
    })
}

export const getSubscriptionVideos = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/video/getSubVideos`, payload)
    .then((response) => {
      console.log('getSubVideos', response)
      const { videos } = response.data;
      if (response.data.success) {
        dispatch({ type: Types.FETCH_SUB_VIDEOS, payload: videos });
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

// COMMENTS
export const addComment = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/comment/addcomment`, payload)
    .then((response) => {
      if (response.data.success) {
        alert('success');
        dispatch(fetchComments(payload))
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to add comment')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to add comment", error)
    })
}

export const fetchComments = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/comment/allcomments`, payload)
    .then((response) => {
      const { comments } = response.data;
      if (response.data.success) {
        dispatch({ type: Types.FETCH_COMMENTS, payload: comments });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to load all comments')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to load all comments", error)
    })
}

// LIKES && DISLIKES

export const getLikes = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/like/getLikes`, payload)
    .then((response) => {
      const { likes } = response.data;
      if (response.data.success) {
        dispatch({ type: Types.GET_LIKES, payload: likes });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to load all likes')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to load all likes", error)
    })
}

export const getDislikes = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/like/getDislikes`, payload)
    .then((response) => {
      const { dislikes } = response.data;
      if (response.data.success) {
        dispatch({ type: Types.GET_LIKES, payload: dislikes });
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to load all likes')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to load all likes", error)
    })
}

export const upLike = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/like/uplike`, payload)
    .then((response) => {
      const { likes } = response.data;
      if (response.data.success) {
        dispatch(getDislikes(payload))
        dispatch(getLikes(payload))
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to uplike')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to uplike", error)
    })
}

export const downLike = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/like/downlike`, payload)
    .then((response) => {
      const { likes } = response.data;
      if (response.data.success) {
        dispatch(getDislikes(payload))
        dispatch(getLikes(payload))
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to uplike')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to uplike", error)
    })
}

export const initDislike = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/like/initDislike`, payload)
    .then((response) => {
      const { likes } = response.data;
      if (response.data.success) {
        dispatch(getDislikes(payload))
        dispatch(getLikes(payload))
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to uplike')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to uplike", error)
    })
}

export const upDislike = (payload) => (dispatch) => {
  dispatch(Loading(true));

  axios
    .post(`${Config.base_url}/like/upDislike`, payload)
    .then((response) => {
      const { dislikes } = response.data;
      if (response.data.success) {
        dispatch(getDislikes(payload))
        dispatch(getLikes(payload))
        dispatch(Loading(false));
      } else {
        dispatch(Loading(false));
        alert('failed to uplike')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("failed to uplike", error)
    })
}