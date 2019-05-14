import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {data} from '../reducers/GoalReducer';


const rootReducer = combineReducers({
  data
});

export default rootReducer
