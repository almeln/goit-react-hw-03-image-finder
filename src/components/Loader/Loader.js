import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import css from './Loader.module.css';

const PhotosLoader = () => (
  <div className={css.loader}>
    <Loader
      type="Circles"
      color="#00BFFF"
      height={80}
      width={80}
      timeout={3000} //3 secs
    />
  </div>
);

export default PhotosLoader;
