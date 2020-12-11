import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Container } from '../../UI';
import { ROUTES } from '../../../consts';
import { useHistory } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './styles.module.scss';

const Home = ({ setShowDecoration }) => {
  const [active, setActive] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setShowDecoration(true);
  }, []);

  let title,
    intro,
    button = useRef(null);

  useEffect(() => {
    const animation = {
      // show : hide
      opacity: active ? 1 : 0,
      text: {
        yPos: active ? 0 : -150,
        delay: active ? 0.35 : 0.1,
        stagger: active ? 0.1 : 0.1,
        duration: active ? 1 : 0.6,
      },
    };

    gsap.to([title, intro, button], {
      duration: animation.text.duration,
      y: animation.text.yPos,
      opacity: animation.opacity,
      delay: animation.text.delay,
      stagger: {
        ease: 'Power2.easeIn',
        amount: animation.text.stagger,
      },
    });
  }, [active, intro, title]);

  const handleClickButton = () => {
    setActive(false);
    history.push(ROUTES.create);
  };

  return (
    <>
      <Container>
        <div className={styles.home}>
          {/* TEXT */}
          <div className={styles.text}>
            <h1
              className={styles.text__title}
              ref={(el) => {
                title = el;
              }}
            >
              Create your own <br />
              <span className={styles.highlight}>Christmas tree</span>
            </h1>
            <p
              className={styles.text__info}
              ref={(el) => {
                intro = el;
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid idunt ut labore et
              sed do eiusmod tempor inci.
            </p>

            <button
              onClick={handleClickButton}
              className={styles.button}
              ref={(el) => {
                button = el;
              }}
            >
              Create a tree
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
