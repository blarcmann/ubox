import * as Types from '../constants/types';

export const Loading = (state) => (dispatch) => {
  dispatch({
    type: Types.LOADING,
    payload: state
  })
}