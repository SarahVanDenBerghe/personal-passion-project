import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.scss';

const Navbar = () => {
  const [audio, setAudio] = useState(null);
  const [playMusic, setPlayMusic] = useState(false);

  const toggleMusic = () => {
    if (playMusic) {
      audio.pause();
      gsap.to(musicLine, {
        duration: 0.45,
        ease: 'Power2.easeOut',
        height: '3rem',
      });
      setPlayMusic(!playMusic);
    } else {
      audio.play();
      gsap.to(musicLine, {
        duration: 0.45,
        ease: 'Power2.easeOut',
        height: '0',
      });
      setPlayMusic(!playMusic);
    }
  };

  useEffect(() => {
    if (!audio) {
      const audioFromFile = new Audio('/assets/music/background.mp3');
      audioFromFile.loop = true;
      audioFromFile.volume = 0.009;
      setAudio(audioFromFile);
    }
  }, []);

  let line,
    musicLine = useRef(null);

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

    gsap.to(musicLine, {
      duration: 0.5,
      ease: 'Power2.easeIn',
      height: '3rem',
      delay: 0.8,
    });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <nav className={styles.nav}>
          <div className={styles.nav__icon}>
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
        <button aria-label="Toggle music" className={styles.volume} onClick={() => toggleMusic()}>
          <img
            height="17"
            width="17"
            ref={(el) => {
              music = el;
            }}
            className={styles.header__volume}
            alt="volume icon"
            src="/assets/icons/volume.svg"
          />
          <span
            ref={(el) => {
              musicLine = el;
            }}
            className={styles.volume__line}
          ></span>
        </button>
      </div>
      <span
        ref={(el) => {
          line = el;
        }}
        className={styles.header__line}
      ></span>
    </header>
  );
};

export default Navbar;
