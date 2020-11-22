import React from 'react';
import './styles.scss';

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
          <img className="image" alt="volume icon" src="/assets/icons/volume.svg" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
