import React from 'react';
import propTypes from 'prop-types';

function PhotoBookMarkCard({ image, title, nickname }) {
  return (
    <div>
      <p>{nickname}</p>
      <img src={image} alt="" />
      <p>{title}</p>
    </div>
  );
}
PhotoBookMarkCard.propTypes = {
  image: propTypes.string,
  title: propTypes.string.isRequired,
  nickname: propTypes.string.isRequired,
};
PhotoBookMarkCard.defaultProps = {
  image: 'http://placekitten.com/500/400',
};
export default PhotoBookMarkCard;
