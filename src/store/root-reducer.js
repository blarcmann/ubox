import { combineReducers } from 'redux';
import userReducer from '../reducers/user_reducer';

export default combineReducers({
  user: userReducer
});