import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { Lights, CreateTree, HomeDecorations } from '..';
import { PerspectiveCamera } from 'drei';
import styles from './styles.module.scss';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../consts';
import { gsap } from 'gsap';

// softShadows();
const CanvasWrapperHome = ({ showDecoration, showIntroCanvas }) => {
  const canvas = useRef(null);
  let { pathname } = useLocation();
  console.log(pathname !== ROUTES.create || pathname !== ROUTES.home);

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
          <PerspectiveCamera position={[0, 0, 11]} lookAt={[0, 0, 0]} makeDefault />
          <Lights />
          <group>
            <Suspense fallback={null}>
              <CreateTree showDecoration={showDecoration} />
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
