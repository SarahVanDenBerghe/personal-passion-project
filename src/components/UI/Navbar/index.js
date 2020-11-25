import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './styles.scss';

const Navbar = () => {
  let line = useRef(null);
  let hamburgerOne = useRef(null);
  let hamburgerTwo = useRef(null);
  let hamburgerThree = useRef(null);
  let music = useRef(null);

  // const animation = {
  //   // show : hide
  //   opacity: active ? 1 : 0,
  //   sidebar: {
  //     xPos: active ? 0 : 600,
  //     borderRadius: active ? 0 : '100% 0 0 50%',
  //   },
  //   text: {
  //     yPos: active ? 0 : 150,
  //     delay: active ? 0.35 : 0.1,
  //     stagger: active ? 0.1 : -0.1,
  //   },
  // };

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
          <div className="icon">
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
            className="image"
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
