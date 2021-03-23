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
        alert('failed to save video')
      }
    })
    .catch((error) => {
      dispatch(Loading(false));
      alert('Please reload page')
      console.log("register user", error)
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
      console.log("register user", error)
    })
}