import * as Types from '../constants/types';

let initialState = {
  videopath: {},
  generatedThumbnail: {},
  all: [],
  videoDetails: {},
  subscribers: 0,
  subscribed: false,
  subVideos: [],
}


export default function videoReducer(state = initialState, action) {
  switch (action.type) {
    case Types.VIDEOPATH:
      return {
        ...state,
        videopath: action.payload
      }
    case Types.GEN_THUMBNAILS:
      return {
        ...state,
        generatedThumbnail: action.payload,
      }
    case Types.FETCH_ALL_VIDEOS:
      return {
        ...state,
        all: action.payload
      }
    case Types.FETCH_VIDEO_DETAILS:
      return {
        ...state,
        videoDetails: action.payload
      }
    case Types.GET_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.payload
      }
    case Types.ACCOUNT_SUBSCRIPTION:
      return {
        ...state,
        subscribed: action.payload
      }
    case Types.SUBSCRIBED:
      return {
        ...state,
        subscribers: state.subscribers += 1,
        subscribed: !state.subscribed
      }
    case Types.UNSUBSCRIBED:
      return {
        ...state,
        subscribers: state.subscribers -= 1,
        subscribed: !state.subscribed
      }
    case Types.FETCH_SUB_VIDEOS:
      return {
        ...state,
        subVideos: action.payload
      }
    default:
      return state;
  }
}