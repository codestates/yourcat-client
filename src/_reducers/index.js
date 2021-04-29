import { combineReducers } from 'redux';
import loginreducer from './login_reducer';
import photoFileReducer from './photoFileReducer';
import create from './createContents_reducer';

const rootReducer = combineReducers({
  loginreducer,
  photoFileReducer,
  create,
});

export default rootReducer;
