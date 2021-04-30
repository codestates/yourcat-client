import { combineReducers } from 'redux';
import loginreducer from './login_reducer';
import signUpDataReducer from './signUpDataReducer';
import signUpReducer from './signUpReducer';

const rootReducer = combineReducers({
  loginreducer,
  signUpDataReducer,
  signUpReducer,
});

export default rootReducer;
