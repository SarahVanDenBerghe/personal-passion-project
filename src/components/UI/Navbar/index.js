import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './styles.scss';

const Navbar = () => {
  let line = useRef(null);
  let hamburgerOne,
    hamburgerTwo,
    hamburgerThree,
    music = useRef(null);

  useEffect(() => {
    gsap.to(line, {
      duration: 0.85,
      ease: 'Power2.easeIn',
      height: '100%',
      delay: 0.15,
    });

    gsap.to([hamburgerOne, hamburgerTwo, hamburgerThree], {
      duration: 0.55,
      width: '100%',
      delay: 0.15,
      stagger: {
        amount: 0.2,
      },
    });

    gsap.to(music, {
      duration: 0.3,
      ease: 'Power2.easeIn',
      scaleX: 1,
      scaleY: 1,
      delay: 0.5,
    });
  }, []);

  return (
    <header className="header">
      <div className="header__content">
        <nav className="nav">
          <div className="nav__icon">
            <span
              ref={(el) => {
                hamburgerOne = el;
              }}
            />
            <span
              ref={(el) => {
                hamburgerTwo = el;
              }}
            />
            <span
              ref={(el) => {
                hamburgerThree = el;
              }}
            />
          </div>
        </nav>
        <div>
          <img
            ref={(el) => {
              music = el;
            }}
            className="header__volume"
            alt="volume icon"
            src="/assets/icons/volume.svg"
          />
        </div>
      </div>
      <span
        ref={(el) => {
          line = el;
        }}
        className="header__line"
      ></span>
    </header>
  );
};

export default Navbar;
