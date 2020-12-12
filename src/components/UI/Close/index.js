import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.scss';

const Close = ({ handleClickClose, active }) => {
  let closeRef = useRef(null);

  const animation = {
    close: {
      scale: active ? 1 : 0,
      delay: active ? 0.3 : 0,
    },
  };

  useEffect(() => {
    gsap.to(closeRef, {
      duration: 0.4,
      ease: 'Power2.easeIn',
      opacity: animation.opacity,
      scaleX: animation.close.scale,
      scaleY: animation.close.scale,
      delay: animation.close.delay,
    });
  }, [active]);

  return (
    <button
      className={styles.close}
      onClick={() => handleClickClose()}
      ref={(el) => {
        closeRef = el;
      }}
    />
  );
};

export default Close;
