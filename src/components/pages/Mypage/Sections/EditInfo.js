import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useCheckToken from '../../../../utils/Hook/useCheckToken';
import getUserInfo from '../../../../_actions/users/getUserInfo';

const DIV = styled.div`
  display: flex;
  flex-direction: column;
`;
const INPUT = styled.input`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 30%;
  padding: 50px;
  margin-top: 200px;
  margin-left: auto;
`;
const EditInfo = React.memo(({ catInfo, nickname, setIsEdit, email }) => {
  const [cat, setCat] = useState(catInfo);
  const [edit, setEdit] = useState({ nickname, email });
  const [{ result }, setResult] = useCheckToken();
  const dispatch = useDispatch();
  const handleChange = key => event => {
    const data =
      key !== 'nickname'
        ? {
            ...edit,
            catInfo: {
              ...cat,
              [key]: event.target.value,
            },
          }
        : {
            ...edit,
            catInfo: cat,
            [key]: event.target.value,
          };
    setEdit({ nickname: data.nickname, email: data.email });
    setCat(data.catInfo);
  };

  const editSubmit = () => {
    setResult();
    if (result.isAuth) {
      const url = 'http://localhost:4000/users/useredit';
      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };
      axios
        .patch(url, { catInfo: cat, nickname: edit.nickname }, config)
        .then(response => {
          console.log(response);
          setIsEdit(false);
          dispatch(getUserInfo(result.accessToken)).then(() => {
            dispatch({ type: 'ERROR_MODAL_TRUE' });
            dispatch({
              type: 'SET_ERROR_MESSAGE',
              payload: '정보가 수정됐습니다.',
            });
          });
        })
        .catch(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '서버 요청에 실패했습니다.',
          });
        });
    }
  };
  const nickNameCheck = () => {
    setResult();
    if (result.isAuth) {
      const url = 'http://localhost:4000/users/nicknamecheck';
      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };
      axios
        .post(url, { nickname: edit.nickname }, config)
        .then(res => {
          console.log(res);
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '변경 가능한 닉네임입니다.',
          });
        })
        .catch(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '중복된 닉네임이 존재합니다.',
          });
        });
    }
  };
  const switchIsEdit = () => {
    setIsEdit(false);
  };

  return (
    <form onSubmit={event => event.preventDefault}>
      <DIV>Cat Name: </DIV>
      <INPUT onChange={handleChange('name')} type="text" value={cat.name} />
      <DIV>Gender: </DIV>
      <select onChange={handleChange('gender')}>
        <option value="male"> Male </option>
        <option value="female"> Female </option>
      </select>
      <DIV>Age: </DIV>
      <INPUT onChange={handleChange('age')} type="number" value={cat.age} />
      <DIV>Nickname: </DIV>
      <INPUT
        onChange={handleChange('nickname')}
        type="text"
        value={edit.nickname}
      />
      <button type="button" onClick={switchIsEdit}>
        CANCEL
      </button>
      <button type="button" onClick={editSubmit}>
        EDIT
      </button>
      <button type="button" onClick={nickNameCheck}>
        Duplicate check
      </button>
    </form>
  );
});
EditInfo.propTypes = {
  catInfo: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default EditInfo;
