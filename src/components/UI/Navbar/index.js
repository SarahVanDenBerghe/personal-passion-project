import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import styles from './styles.module.scss';

const Navbar = () => {
  const [audio, setAudio] = useState(null);
  const [playMusic, setPlayMusic] = useState(false);

  let line,
    music,
    musicLine,
    tree,
    treeLine = useRef(null);

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
      audioFromFile.volume = 0.1;
      setAudio(audioFromFile);
    }
  }, []);

  useEffect(() => {
    gsap.to(line, {
      duration: 0.85,
      ease: 'Power2.easeIn',
      height: '100%',
      delay: 0.35,
    });

    gsap.to(tree, {
      duration: 0.5,
      ease: 'back.out(2.2)',
      scaleX: 1,
      scaleY: 1,
      delay: 1.2,
    });

    gsap.to(treeLine, {
      duration: 0.7,
      ease: 'Power2.easeOut',
      scaleY: 1,
      delay: 1.3,
    });

    gsap.to(music, {
      duration: 0.3,
      ease: 'back.out(2.2)',
      scaleX: 1,
      scaleY: 1,
      delay: 1.7,
    });

    gsap.to(musicLine, {
      duration: 0.5,
      ease: 'Power2.easeIn',
      height: '3rem',
      delay: 1.7,
    });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <nav className={styles.nav}>
          <Link className={styles.button} to={ROUTES.home}>
            <div className={styles.tree}>
              <img
                height="40"
                width="40"
                ref={(el) => {
                  tree = el;
                }}
                className={styles.header__tree}
                alt="volume icon"
                src="/assets/icons/tree-circle.svg"
              />
              <span
                ref={(el) => {
                  treeLine = el;
                }}
                className={styles.tree__line}
              />
            </div>
          </Link>
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
