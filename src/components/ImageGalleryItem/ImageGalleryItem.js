import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt }) => (
  <img src={src} alt={alt} className="ImageGalleryItem-image" />
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
