import * as Types from "../constants/types";

const initialState = {
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default: {
      return {
        ...state
      }
    }
  }
};