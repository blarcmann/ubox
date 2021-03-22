import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import uiReducer from '../reducers/uiReducer';

export default combineReducers({
  user: userReducer,
  uiReducer: uiReducer,
});