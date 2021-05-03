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
function EditContents({ title, description, setIsEdit, setContentData }) {
  const { contentId } = useParams();
  const [change, setChange] = useState({ title, description });
  const [{ result }, setResult] = useCheckToken();
  const handleDetailChange = key => event => {
    const data = {
      ...change,
      [key]: event.target.value,
    };
    setChange(data);
    setContentData(data);
  };
  const handleSubmit = () => {
    setResult();
    if (result) {
      axios
        .patch(
          `http://localhost:4000/contents/edit/${contentId}`,
          { title, description },
          {
            headers: {
              authorization: `Bearer ${result}`,
              'Content-Type': 'application/json',
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
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  setIsEdit: propTypes.func.isRequired,
  setContentData: propTypes.func.isRequired,
};
export default EditContents;
