import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Header from './Sections/Header';
import useCheckToken from '../../../utils/Hook/useCheckToken';

const CONTENT = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 30px;
  padding-bottom: 60px;
`;

const LIST = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 70%;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.09);
`;

const TopBar = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 30px;
  margin-bottom: 60px;
`;

const TITLE = styled.div`
  padding: 10px;
  width: 60%;
  font-weight: 300;
  font-size: 21px;
  text-align: center;
`;

const WRITER = styled.div`
  padding: 10px;
  width: 20%;
  font-weight: 300;
  font-size: 21px;
  text-align: center;
`;

const DATE = styled.div`
  padding: 10px;
  width: 20%;
  font-weight: 300;
  font-size: 21px;
  text-align: center;
`;

const SELECT = styled.select`
  padding: 8px;
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 7px;
  background-color: white;
  font-weight: 300;
  font-size: 17px;
  margin: 0 20px;
  &:hover {
    border: 1.5px solid #badfdb;
  }
`;

const NEWPOSTBNT = styled.button`
  padding: 10px;
  background-color: #badfdb;
  color: white;
  border-radius: 7px;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

const LISTCATEGORY = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  justify-content: center;
  padding: 5px 0;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;

const CATEGORYTITLE = styled.div`
  padding: 10px 20px;
  width: 60%;
  background: rgba(0, 0, 0, 0.003);
  font-weight: 300;
  font-size: 20px;
`;

const CATEGORYWRITER = styled.div`
  padding: 10px;
  width: 20%;
  background: rgba(0, 0, 0, 0.003);
  font-weight: 300;
  font-size: 20px;
  text-align: center;
`;

const CATEGORYDATE = styled.div`
  padding: 10px;
  width: 20%;
  background: rgba(0, 0, 0, 0.003);
  font-weight: 300;
  font-size: 20px;
  text-align: center;
`;

const MOREBUTTON = styled.button`
  padding: 10px;
  margin-top: 30px;

  background-color: #ffc5a1;
  color: white;
  border-radius: 7px;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

function CommunityPage() {
  const [categorys, setCategorys] = useState([]);
  const [Skip, setSkip] = useState(20);
  const [Limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [categoryValue, setCategoryValue] = useState('general');
  const [{ result }, setResult] = useCheckToken();
  const dispatch = useDispatch();
  const history = useHistory();

  const url = `${process.env.REACT_APP_SERVER_URL}/contents/${categoryValue}`;

  useEffect(() => {
    axios
      .post(url)
      .then(response => {
        const resData = response.data.contentsList;
        setCategorys(resData);
        setSize(response.data.contentsLength);
      })
      .catch(() => '');
  }, [categoryValue]);

  const createPost = () => {
    setResult();
    if (!result) {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '???????????? ????????? ????????? ?????????.',
      });
    } else {
      history.push('/community/create');
    }
  };

  const loadMoreHandler = () => {
    setLimit(10);

    const skip = Skip + Limit;
    const body = {
      skip: Skip,
      limit: Limit,
      loadMore: true,
    };

    axios
      .post(url, body)
      .then(response => {
        const resData = response.data.contentsList;
        if (body.loadMore) {
          setCategorys([...categorys, ...resData]);
        } else {
          setCategorys(resData);
        }
        setSize(response.data.contentsLength);
      })
      .catch(() => '');
    setSkip(skip);
  };

  return (
    <>
      <Header />
      <CONTENT>
        <TopBar>
          <SELECT onChange={event => setCategoryValue(event.target.value)}>
            <option value="general">General</option>
            <option value="question">Question</option>
            <option value="knowhow">Knowhow</option>
          </SELECT>
          <NEWPOSTBNT onClick={createPost}>New Post</NEWPOSTBNT>
        </TopBar>

        <LIST>
          <TITLE>TITLE</TITLE>
          <WRITER>WRITER</WRITER>
          <DATE>DATE</DATE>
        </LIST>

        {categorys.map(({ title, contentId, user, createdAt }) => (
          <LISTCATEGORY key={contentId}>
            {title.length > 30 ? (
              <CATEGORYTITLE key={title}>
                <Link to={`/community/detail/${contentId}`}>
                  {title.slice(0, 30)}...
                </Link>
              </CATEGORYTITLE>
            ) : (
              <CATEGORYTITLE key={title}>
                <Link to={`/community/detail/${contentId}`}>{title}</Link>
              </CATEGORYTITLE>
            )}
            {user !== undefined ? (
              <CATEGORYWRITER key={user}>{user.userName}</CATEGORYWRITER>
            ) : (
              <div> </div>
            )}
            <CATEGORYDATE key={createdAt}>
              {createdAt.slice(0, 10)}
            </CATEGORYDATE>
          </LISTCATEGORY>
        ))}
        {size >= Limit && (
          <MOREBUTTON onClick={loadMoreHandler}>MORE</MOREBUTTON>
        )}
      </CONTENT>
    </>
  );
}

export default CommunityPage;
