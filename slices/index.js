import {combineReducers} from 'redux';
import record from './record';
import sensor from './sensor';

const rootReducer = combineReducers({
  record,
  sensor,
});

export default rootReducer;
