import React from 'react';
import styles from './styles.module.scss';

// https://codesandbox.io/s/usespring-react-hook-forked-k40ut?file=/src/index.js

const Container = ({ children }) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Container;
