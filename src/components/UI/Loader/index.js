import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './styles.module.scss';
import { gsap } from 'gsap';
import { useStore } from '../../../hooks';

const Loader = observer(({ setShowTree }) => {
  const { treeStore } = useStore();
  const circleOne = useRef(null);
  const circleTwo = useRef(null);
  const circleThree = useRef(null);
  const loader = useRef(null);

  useEffect(() => {
    gsap.to([circleOne.current, circleTwo.current, circleThree.current], {
      y: 0,
      stagger: { each: 0.15, yoyo: true, repeat: -1 },
      ease: 'sine.inOut',
    });
  });

  useEffect(() => {
    if (!treeStore.loading) {
      gsap.to(loader.current, {
        duration: 0.8,
        ease: 'Power2.easeIn',
        opacity: 0,
        scale: 0,
        transformOrigin: '50% 50%',
      });
    }

    /* Content inladen */
    setTimeout(() => setShowTree(true), 1000);
  }, [treeStore.loading]);

  return (
    <div ref={loader} className={styles.loader}>
      <svg width="120" height="100">
        <circle ref={circleOne} cx="20" cy="70" r="8"></circle>
        <circle ref={circleTwo} cx="60" cy="70" r="8"></circle>
        <circle ref={circleThree} cx="100" cy="70" r="8"></circle>
      </svg>
      <p>Loading</p>
    </div>
  );
});

export default Loader;
