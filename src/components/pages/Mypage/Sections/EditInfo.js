import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useCheckToken from '../../../../utils/Hook/useCheckToken';

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

function EditInfo({
  name,
  gender,
  age,
  nickname,
  email,
  setIsEdit,
  setCatInfo,
  setUserInfo,
}) {
  const history = useHistory();
  const [edit, setEdit] = useState({ name, gender, age, nickname, email });
  const [{ result }, setResult] = useCheckToken();

  const handleChange = key => event => {
    const data = {
      ...edit,
      [key]: event.target.value,
    };
    setEdit(data);
    setCatInfo(data);
    setUserInfo(data);
  };

  const editSubmit = () => {
    setResult();
    if (result) {
      const url = 'http://localhost:4000/users/useredit';
      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };
      axios
        .patch(url, { name, gender, age, nickname, email }, config)
        .then(response => {
          console.log(response);
          setIsEdit(false);
        })
        .catch(err => console.log(err));
    }
  };

  const switchIsEdit = () => {
    setIsEdit(false);
  };

  const deleteSubmit = () => {
    setResult();
    if (result) {
      const url = 'http://localhost:4000/users/withdrawal';
      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };
      axios.delete(url, config).then(response => {
        console.log('삭제?', response);
        alert('계정이 삭제되었습니다.');
        history.push('/');
      });
    }
  };

  console.log(history);
  console.log(editSubmit);

  return (
    <form onSubmit={event => event.preventDefault}>
      <DIV>Cat Name: </DIV>
      <INPUT onChange={handleChange('name')} type="text" value={edit.name} />
      <DIV>Gender: </DIV>
      <INPUT
        onChange={handleChange('gender')}
        type="text"
        value={edit.gender}
      />
      <DIV>Age: </DIV>
      <INPUT onChange={handleChange('age')} type="text" value={edit.age} />
      <DIV>Nickname: </DIV>
      <INPUT
        onChange={handleChange('nickname')}
        type="text"
        value={edit.nickname}
      />
      <DIV>E-mail: </DIV>
      <INPUT onChange={handleChange('email')} type="text" value={edit.email} />
      <button type="button" onClick={switchIsEdit}>
        취소
      </button>
      <button type="button" onClick={editSubmit}>
        수정
      </button>
      <button type="button" onClick={deleteSubmit}>
        삭제
      </button>
    </form>
  );
}
EditInfo.propTypes = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  setCatInfo: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired,
};

export default EditInfo;
