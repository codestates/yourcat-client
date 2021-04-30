import { combineReducers } from 'redux';
import create from './contents/createContents_reducer';
import edit from './contents/editContents_reducer';
import detail from './contents/detailContents_reducer';
import category from './contents/categoryContents_reducer';
import signUpDataReducer from './users/signUpDataReducer';
import signUpReducer from './users/signUpReducer';
import loginreducer from './users/login_reducer';

const rootReducer = combineReducers({
  loginreducer,
  create,
  edit,
  detail,
  category,
  signUpDataReducer,
  signUpReducer,
});

export default rootReducer;
