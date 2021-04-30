import { combineReducers } from 'redux';
import loginreducer from './login_reducer';
import photoFileReducer from './photoFileReducer';
import create from './contents/createContents_reducer';
import edit from './contents/editContents_reducer';
import detail from './contents/detailContents_reducer';
import category from './contents/categoryContents_reducer';

const rootReducer = combineReducers({
  loginreducer,
  photoFileReducer,
  create,
  edit,
  detail,
  category,
});

export default rootReducer;
