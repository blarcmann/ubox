import * as Types from '../constants/types';

let initialState = {
  videopath: {},
  generatedThumbnail: {},
  all: [],
  videoDetails: {},
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
    default:
      return state;
  }
}