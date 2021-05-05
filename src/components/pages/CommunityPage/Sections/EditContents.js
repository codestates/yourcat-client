import React, { useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router';
import useCheckToken from '../../../../utils/Hook/useCheckToken';

const INPUT = styled.input`
  width: 100%;
  height: 100%;
  padding: 50px;
`;
function EditContents({
  title,
  description,
  like,
  user,
  setIsEdit,
  setContentData,
}) {
  console.log(user);
  const { contentId } = useParams();
  const [change, setChange] = useState({ title, description });
  const [{ result }, setResult] = useCheckToken();
  const handleDetailChange = key => event => {
    const data = {
      ...change,
      like,
      user,
      [key]: event.target.value,
    };
    setChange(data);
    setContentData(data);
  };
  const handleSubmit = () => {
    setResult();
    console.log(result);
    console.log(contentId);
    if (result.isAuth) {
      axios
        .patch(
          `http://localhost:4000/contents/edit/${contentId}`,
          { title, description },
          {
            headers: {
              authorization: `Bearer ${result.accessToken}`,
            },
          },
        )
        .then(res => {
          console.log(res);
          setIsEdit(false);
        })
        .catch(err => err);
    }
  };
  const switchIsEdit = () => {
    setIsEdit(false);
  };

  return (
    <form onSubmit={event => event.preventDefault}>
      <INPUT
        onChange={handleDetailChange('title')}
        type="text"
        value={change.title}
      />

      <INPUT
        onChange={handleDetailChange('description')}
        type="text"
        value={change.description}
      />
      <button type="button" onClick={switchIsEdit}>
        취소
      </button>
      <button type="button" onClick={handleSubmit}>
        수정
      </button>
    </form>
  );
}
EditContents.propTypes = {
  like: propTypes.number.isRequired,

  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  setIsEdit: propTypes.func.isRequired,
  user: propTypes.shape({
    userId: propTypes.string.isRequired,
    userName: propTypes.string.isRequired,
  }),
  setContentData: propTypes.func.isRequired,
};
EditContents.defaultProps = {
  user: {},
};
export default EditContents;
