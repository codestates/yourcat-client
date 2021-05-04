import { combineReducers } from 'redux';
import create from './contents/createContents_reducer';
import edit from './contents/editContents_reducer';
import detail from './contents/detailContents_reducer';
import category from './contents/categoryContents_reducer';
import signUpData from './users/signUpData_reducer';
import signUpRequest from './users/signUpRequest_reducer';
import login from './users/login_reducer';
import userModal from './users/modal_reducer';
import photo from './contents/createPhoto_reducer';
import photoModal from './contents/photoModal_reducer';
import getUserInfo from './users/getuserinfo_reducer';
import token from './users/token_reducer';

const rootReducer = combineReducers({
  login,
  create,
  edit,
  detail,
  category,
  signUpData,
  signUpRequest,
  userModal,
  photo,
  photoModal,
  getUserInfo,
  token,
});

export default rootReducer;
