import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import uiReducer from '../reducers/uiReducer';
import videoReducer from '../reducers/videoReducer';

export default combineReducers({
  user: userReducer,
  video: videoReducer,
  uiReducer: uiReducer,
});