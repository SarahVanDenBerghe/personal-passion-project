import React, { Suspense, useRef, useEffect, useState, useLayoutEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { Lights, CreateTree, HomeDecorations } from '..';
import { PerspectiveCamera } from 'drei';
import styles from './styles.module.scss';
import { gsap } from 'gsap';

const useWindowSize = () => {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const CanvasWrapperHome = ({ showDecoration, showIntroCanvas }) => {
  const width = useWindowSize();
  const canvas = useRef(null);

  useEffect(() => {
    gsap.to(canvas.current, {
      duration: 0.55,
      ease: 'Power2.easeIn',
      x: showIntroCanvas ? 0 : 500,
      opacity: showIntroCanvas ? 1 : 0,
      scaleX: showIntroCanvas ? 1 : 0.7,
      scaleY: showIntroCanvas ? 1 : 0.7,
    });
  }, [showIntroCanvas]);

  return (
    <>
      <div className={styles.canvas__wrapper} ref={canvas}>
        <Canvas className={styles.canvas} shadowMap resize={{ scroll: false }}>
          <PerspectiveCamera position={width < 992 ? [3.4, 1.5, 15] : [0, 0, 11]} lookAt={[0, 0, 0]} makeDefault />
          <Lights />
          <group>
            <Suspense fallback={null}>
              <CreateTree mobile={width < 992 ? true : false} showDecoration={showDecoration} />
            </Suspense>
            <Suspense fallback={null}>
              <HomeDecorations showDecoration={showDecoration} />
            </Suspense>
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default CanvasWrapperHome;
