import React from 'react';
import styles from './Header.module.scss';
const Header = () => {
  return (
    <div className={styles.Header}>
      <img src="/Logo.svg" alt="logo" />
    </div>
  );
};

export default Header;
