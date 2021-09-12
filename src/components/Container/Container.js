import React from 'react';
import css from './Container.module.css';

const Container = ({ children }) => (
  <div className={css.container}>{children}</div>
);

export default Container;
