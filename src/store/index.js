import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  LOAD_LOCAL_DATA_SUCCESS,
  LOAD_LOCAL_DATA_FAILURE,
  SAVE_LOCAL_DATA
} from '../reducers/GoalReducer';


const rootReducer = combineReducers({
  auth,
  download,
  media,
  storytelling,
  sound,
  routes,
  user,
  settings
});

export default rootReducer;