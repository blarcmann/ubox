import { LOGIN, REGISTER, AUTH, LOGOUT } from '../constants/types';

let initialState = {

}


export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return { ...state, register: action.payload }
    case LOGIN:
      return { ...state, loginSucces: action.payload }
    case AUTH:
      return { ...state, userData: action.payload }
    case LOGOUT:
      return { ...state }
    default:
      return state;
  }
}