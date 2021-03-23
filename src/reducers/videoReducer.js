import * as Types from '../constants/types';

let initialState = {
  videopath: {},
  generatedThumbnail: {},
}


export default function videoReducer(state = initialState, action) {
  switch (action.type) {
    case Types.VIDEOPATH:
      return { ...state, videopath: action.payload }
    case Types.GEN_THUMBNAILS:
      return { ...state, generatedThumbnail: action.payload }
    default:
      return state;
  }
}