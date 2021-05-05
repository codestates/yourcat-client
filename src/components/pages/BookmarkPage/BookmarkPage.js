import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import BookMarkContents from './Sections/BookMarkContents';
import { matchStyle, noneMatchStyle } from './styles/styles';

const TopPadding = styled.div`
  padding-top: 15vh;
`;
const Button = styled.button`
  all: unset;
  padding: 5px;
  &:hover {
    background-color: #ffc5a1;
    color: black;
  }
  ${props => (props.name === props.category ? matchStyle : noneMatchStyle)};
`;
const ButtonWrap = styled.div`
  position: fixed;
  height: 10vh;
`;
const MainSection = styled.div`
  top: 30vh;
  overflow-hidden;
`;
function Bookmark() {
  const [category, setCategory] = useState('Photo');
  const [bookmark, setBookmark] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(data => data.token);
  useEffect(() => {
    axios
      .get('http://localhost:4000/bookmarks/list', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
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
      <TopPadding />
      <ButtonWrap>
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
      </ButtonWrap>
      <MainSection>
        <BookMarkContents bookmarks={bookmark} category={category} />
      </MainSection>
    </>
  );
}

export default Bookmark;
