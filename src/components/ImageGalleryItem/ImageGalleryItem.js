import React from 'react';

const ImageGalleryItem = ({ src, alt }) => (
  <img src={src} alt={alt} className="ImageGalleryItem-image" />
);

export default ImageGalleryItem;
