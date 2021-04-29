import { combineReducers } from 'redux';
import loginreducer from './login_reducer';
import photoFileReducer from './photoFileReducer';

const rootReducer = combineReducers({
  loginreducer,
  photoFileReducer,
});

export default rootReducer;
