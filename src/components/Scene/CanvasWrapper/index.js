import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Lights, Tree, Floor, Baubles, CameraControls } from '..';
import { useHistory, useLocation } from 'react-router';
import { ROUTES } from '../../../consts';
import { useStore } from '../../../hooks';
import { useSpring, a } from 'react-spring/three';
import styles from './styles.module.scss';
import { gsap } from 'gsap';
import { observer } from 'mobx-react-lite';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// softShadows();
const CanvasWrapper = observer(() => {
  const [baublePreview, setBaublePreview] = useState(null);
  const [groupPos, setGroupPos] = useState([0, 0, 0]);
  const canvas = useRef(null);
  const history = useHistory();
  const { baublesStore, treeStore } = useStore();
  const { pathname } = useLocation();

  const timeline = gsap.timeline({ defaults: { duration: 1, ease: 'Power2.easeIn' } });

  let title,
    count = useRef(null);

  const spring = useSpring({
    group: groupPos,
  });

  useEffect(() => {
    timeline.from([count, title], {
      y: 100,
      opacity: 0,
      ease: 'power4.inOut',
      duration: 1.2,
      stagger: 0.1,
      delay: 0.3,
    });

    timeline.play();
  }, []);

  const showPreview = ROUTES.add.firststep == `/${pathname.split('/')[3]}/${pathname.split('/')[4]}`;

  return (
    <>
      <div className={styles.title__wrapper}>
        <p
          ref={(el) => {
            count = el;
          }}
          className={styles.count}
        >
          {baublesStore.baubles.length} {`wish${baublesStore.baubles.length !== 1 ? 'es' : ''}`}
        </p>

        <h1
          ref={(el) => {
            title = el;
          }}
          className={styles.title}
        >
          {treeStore.currentTree.name}
        </h1>
      </div>

      <div className={styles.notifications}>
        <ToastContainer transition={Zoom} position="bottom-left" closeOnClick={false} draggable />
      </div>

      <div className={styles.canvas__wrapper} ref={canvas}>
        <Canvas
          // colorManagement
          shadowMap
          resize={{ scroll: false }}
          // onCreated={({ gl }) => {
          //   gl.toneMapping = THREE.Uncharted2ToneMapping;
          //   gl.outputEncoding = THREE.sRGBEncoding;
          // }}
        >
          <CameraControls pathname={pathname} canvas={canvas} setGroupPos={setGroupPos} />
          <Lights />
          <Floor />
          <a.group position={spring.group}>
            <Suspense fallback={null}>
              <Tree
                showPreview={showPreview}
                setBaublePreview={setBaublePreview}
                history={history}
                pathname={pathname}
              />
              <Baubles history={history} pathname={pathname} />
            </Suspense>
          </a.group>
          {baublePreview && showPreview ? baublePreview : ''};
        </Canvas>
      </div>
    </>
  );
});

export default CanvasWrapper;
