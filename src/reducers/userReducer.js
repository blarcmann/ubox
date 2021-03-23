import { LOGIN, REGISTER, AUTH, LOGOUT } from '../constants/types';

let initialState = {
  user: {},
  auth: {},
}


export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return { ...state, register: action.payload }
    case LOGIN:
      return { ...state, user: action.payload }
    case AUTH:
      return { ...state, auth: action.payload }
    case LOGOUT:
      return { ...state }
    default:
      return state;
  }
}