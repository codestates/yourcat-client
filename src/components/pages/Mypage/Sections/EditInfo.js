import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useCheckToken from '../../../../utils/Hook/useCheckToken';
import getUserInfo from '../../../../_actions/users/getUserInfo';
import { MODAL, HeaderBox, HEADER } from '../../../../utils/ModalHeader';
import { Button, ButtonContainer } from '../../../../utils/button';

const INPUTDIV = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50%;
`;

const Input = styled.input`
  all: unset;
  width: 60%;
  margin: 0 10px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
  text-align: center;
  &:hover {
    border-bottom: 1px solid #badfdb;
  }
`;

const NickBOX = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-top: 40px;
`;

const NickInput = styled.input`
  all: unset;
  width: 30%;
  margin-right: 10px;

  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
  text-align: center;
  &:hover {
    border-bottom: 1px solid #badfdb;
  }
`;

const BUTTON = styled.button`
  padding: 5px 0;
  width: 25%;
  margin-right: 10px;
  background-color: #badfdb;
  color: white;
  border-radius: 7px;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

const SELECT = styled.select`
  all: unset;
  width: 60%;
  margin: 0 10px;
  text-align-last: center;

  border: none;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);

  &:hover {
    border-bottom: 1px solid #badfdb;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 200%;
  background-color: rgb(0, 0, 0, 0);
  background-color: rgb(0, 0, 0, 0.2);
  position: fixed;
  margin: auto;
  top: 0;
  z-index: 10;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 420px;
  height: 500px;
  border-radius: 5px;
  background-color: #fcf9ea;
  align-items: center;
`;
const TITLE = styled('div')`
  margin: 10px 0;
  width: 40%;
`;

const INPUTBOX = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
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
          console.log(email);
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
  //   console.log(history);
  return (
    <Wrapper>
      <Main>
        <MODAL onSubmit={event => event.preventDefault}>
          <HeaderBox>
            <HEADER>Edit Info</HEADER>
          </HeaderBox>
          <INPUTDIV>
            <INPUTBOX>
              <TITLE>Cat Name: </TITLE>
              <Input
                onChange={handleChange('name')}
                type="text"
                value={cat.name}
              />
            </INPUTBOX>

            <INPUTBOX>
              <TITLE>Cat Gender: </TITLE>
              {/* <Input onChange={handleChange('gender')} type="text" value={cat.gender} /> */}
              <SELECT onChange={handleChange('gender')}>
                <option value="male"> Male </option>
                <option value="female"> Female </option>
              </SELECT>
            </INPUTBOX>
            <INPUTBOX>
              <TITLE>Cat Age: </TITLE>
              <Input
                onChange={handleChange('age')}
                type="number"
                value={cat.age}
              />
            </INPUTBOX>
            <NickBOX>
              <TITLE>Nickname: </TITLE>
              <NickInput
                onChange={handleChange('nickname')}
                type="text"
                value={edit.nickname}
              />
              <BUTTON type="button" onClick={nickNameCheck}>
                중복 체크
              </BUTTON>
            </NickBOX>
          </INPUTDIV>
          <ButtonContainer>
            <Button type="button" onClick={switchIsEdit}>
              취소
            </Button>
            <Button type="button" onClick={editSubmit}>
              수정
            </Button>
          </ButtonContainer>
        </MODAL>
      </Main>
    </Wrapper>
  );
});
EditInfo.propTypes = {
  catInfo: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};
// EditInfo.defaultProps = {
//   setInfo: () => {},
// };
export default EditInfo;
// 요청을 보낼 때 꼭 데이터를 담아서 요청을 보내기
// 다른 부분 말고 닉네임은 중복을 확인해야 한다.
// 닉네임 옆에 버튼을 추가해서 버튼을 누르면 닉네임 체크 요청을 보내고
// 요청이 트루이거나, 닉네임이 변경되지 않았을 때 에딧 요청을 보낸다
