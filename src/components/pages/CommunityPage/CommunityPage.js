import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LIST = styled.div`
  display: flex;
  felx-direction: row;
  margin: 120px;
  justify-content: center;
`;

const TITLE = styled.div`
  display: flex;
  padding: 10px;
  border: none;
  width: 35%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 35px;
`;

const WRITER = styled.div`
  display: flex;
  padding: 10px;
  border: none;
  width: 15%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 35px;
`;

const DATE = styled.div`
  display: flex;
  padding: 10px;
  border: none;
  width: 10%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 35px;
`;

const SELECT = styled.select`
  display: flex;
  padding: 16px;
  border: none;
  width: 10%;
  height: 20%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 19px;
`;

const LISTCATEGORY = styled.div`
  display: flex;
  felx-direction: row;
  justify-content: center;
`;

const CATEGORYTITLE = styled.div`
  display: flex;
  padding: 10px;
  border: none;
  width: 40%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 17px;
`;

const CATEGORYWRITER = styled.div`
  display: flex;
  padding: 10px;
  border: none;
  width: 15%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 17px;
`;

const CATEGORYDATE = styled.div`
  display: flex;
  padding: 10px;
  border: none;
  width: 10%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 17px;
`;

const BUTTON = styled.button`
  display: flex;
  padding: 10px;
  margin: 50px auto;
  border: 1px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  width: 2.7%;
  font-weight: 300;
  font-size: 10px;
  align-item: center;
  background-color: #f5f5f5;
`;

function CommunityPage() {
  const [categorys, setCategorys] = useState([]);
  const [Skip, setSkip] = useState(20);
  const [Limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [categoryValue, setCategoryValue] = useState('general');

  console.log(setLimit);

  const url = `http://localhost:4000/contents/${categoryValue}`;

  useEffect(() => {
    console.log(categoryValue);

    axios
      .post(url)
      .then(response => {
        console.log('res.data는 ', response.data);
        const result = response.data.contentsList;
        console.log('result', result);

        setCategorys(result);

        setSize(response.data.contentsLength);
      })
      .catch(err => console.log(err));
  }, [categoryValue]);

  const loadMoreHandler = () => {
    console.log('더보기');
    const skip = Skip + Limit;
    const body = {
      skip: Skip,
      limit: Limit,
      loadMore: true,
    };

    axios
      .post(url, body)
      .then(response => {
        console.log('res.data.contentList', response.data.contentsList);
        const result = response.data.contentsList;
        console.log('result', result);
        if (body.loadMore) {
          setCategorys([...categorys, ...result]);
        } else {
          setCategorys(result);
        }
        setSize(response.data.contentsLength);
      })
      .catch(err => console.log(err));
    setSkip(skip);
  };

  return (
    <>
      <LIST>
        <TITLE>TITLE</TITLE>
        <WRITER>WRITER</WRITER>
        <DATE>DATE</DATE>
        <SELECT onChange={event => setCategoryValue(event.target.value)}>
          <option value="general">General</option>
          <option value="question">Question</option>
          <option value="knowhow">Knowhow</option>
        </SELECT>
      </LIST>
      {categorys.map(({ title, contentId, userId, createdAt }) => (
        <LISTCATEGORY>
          {title.length > 30 ? (
            <CATEGORYTITLE key={title}>
              <Link to={`/contents/detail/${contentId}`}>
                {title.slice(0, 30)}...
              </Link>
            </CATEGORYTITLE>
          ) : (
            <CATEGORYTITLE key={title}>
              <Link to={`/contents/detail/${contentId}`}>{title}</Link>
            </CATEGORYTITLE>
          )}
          {userId !== undefined ? (
            <CATEGORYWRITER key={userId}>{userId.nickname}</CATEGORYWRITER>
          ) : (
            <div> </div>
          )}
          <CATEGORYDATE key={createdAt}>{createdAt.slice(0, 10)}</CATEGORYDATE>
        </LISTCATEGORY>
      ))}
      {size >= Limit && <BUTTON onClick={loadMoreHandler}>MORE</BUTTON>}
    </>
  );
}

export default CommunityPage;

// 버튼 만들어서 버튼을 누르면 다음 페이지가 렌더링 되게 해주기
// select 가 바뀌면 category의 useParms()가 바뀌어야한다.
// useParmas 쓰지말고 그냥 링크만 걸어줄까? state로?
