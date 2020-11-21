import React from 'react';
import styles from './styles.scss';

const Navbar = () => {
  return (
    <header className="header">
      <div className="header__content">
        <nav className="nav">
          <div className="icon">
            <span />
            <span />
            <span />
          </div>
        </nav>

        <div>
          <img className="image" src="/assets/icons/volume.svg" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
