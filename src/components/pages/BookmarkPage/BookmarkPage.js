import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import BookMarkContents from './Sections/BookMarkContents';
import { matchStyle, noneMatchStyle } from './styles/styles';
import HEADER from '../../../utils/Header';

const ButtonDIV = styled.div`
  margin-left: auto;
  margin-right: 50px;

  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  width: 40%;
  background-color: #badfdb;
  color: white;
  border-radius: 7px;
  font-size: 17px;
  font-weight: 500;
  &:hover {
    background-color: #a79c8e;
  }
  ${props => (props.name === props.category ? matchStyle : noneMatchStyle)};
`;

const MainSection = styled.div`
  margin: 10px 0;
`;
function Bookmark() {
  const [category, setCategory] = useState('Photo');
  const [bookmark, setBookmark] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(data => data.token);
  console.log(token);
  useEffect(() => {
    axios
      .get('http://localhost:4000/bookmarks/list', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        console.log(data);
        setBookmark(data.bookmark);
      })
      .catch(() => {
        dispatch({ type: 'ERROR_MODAL_TRUE' });
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: '서버요청에 실패했습니다.',
        });
      });
  }, [token]);
  const handleClick = ({ target }) => {
    if (target.textContent === 'Photo') {
      setCategory('Photo');
    } else {
      setCategory('Community');
    }
  };

  return (
    <>
      <HEADER>북마크</HEADER>
      <ButtonDIV>
        <Button
          type="button"
          name="Photo"
          category={category}
          onClick={handleClick}
        >
          Photo
        </Button>
        <Button
          type="button"
          name="Community"
          category={category}
          onClick={handleClick}
        >
          Community
        </Button>
      </ButtonDIV>
      <MainSection>
        <BookMarkContents bookmarks={bookmark} category={category} />
      </MainSection>
    </>
  );
}

export default Bookmark;
