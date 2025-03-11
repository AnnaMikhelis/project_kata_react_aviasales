import React from 'react';
import styles from './Header.module.scss';
import logo from '../../Logo.svg';
const Header = () => {
  return (
    <div className={styles.Header}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Header;
