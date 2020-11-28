import React, {
  useState,
  Suspense,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { softShadows, OrbitControls, PerspectiveCamera } from 'drei';
import { Lights, Tree, Floor, Baubles } from '..';
import * as THREE from 'three';
import { DetailContext } from '../../../contexts/DetailContext';
import { useSpring, a } from 'react-spring/three';
import { BaublesContext } from '../../../contexts/BaublesContext';
import { gsap } from 'gsap';
import { useHistory, useLocation} from 'react-router';
import './styles.scss';
import { ROUTES } from '../../../consts';

softShadows();

const CameraControls = ({ view, canvas, pathname }) => {
  const { gl, camera } = useThree();
  const [zoom, setZoom] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const controls = useRef(null);

  let currDistance = 0;
  let factor = 0;

  const animation = {
    sidebar: {
      xPos: pathname == 'detail' ? -150 : 0,
    },
  };

  useEffect(() => {
    const zoomDistance = pathname == ROUTES.home ? 4 : 8;
    setZoom(zoomDistance);

    currDistance = camera.position.length();
    factor = zoom / currDistance;
    const x = camera.position.x * factor;
    const y = camera.position.y * factor; // look at Y
    const z = camera.position.z * factor;

    if (hasLoaded) {
      gsap.fromTo(
        camera.position,
        {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        },
        {
          duration: 0.7,
          ease: 'Power2.easeOut',
          x: x,
          y: y,
          z: z,
          onComplete: () => controls.current.update(),
        }
      );

      gsap.to(canvas.current, {
        duration: 0.55,
        ease: 'Power2.easeIn',
        x: animation.sidebar.xPos,
      });
    }
  }, [view]);

  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 300;

    gsap.to(camera.position, {
      duration: 2,
      ease: 'Power2.easeOut',
      z: 8,
      onComplete: () => {
        controls.current.update();
        setHasLoaded(true);
      },
    });
  }, []);

  //codesandbox.io/s/r3f-basic-demo-f8zii?file=/src/index.js:492-612

  return (
    <>
      <OrbitControls
        enableKeys={false}
        enablePan={false}
        enableZoom={false}
        enableDamping={false}
        target={[0, 0, 0]}
        args={[camera, gl.domElement]}
        ref={controls}
      />
    </>
  );
};

const CanvasWrapper = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [baublePreview, setBaublePreview] = useState(null);
  const canvas = useRef(null);
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <>
      <div className="canvas--wrapper" ref={canvas}>
        <Canvas colorManagement shadowMap resize={{ scroll: false }}>
          <CameraControls pathname={pathname} canvas={canvas} />
          <group>
            <Lights />
            <Floor />
            <Suspense fallback={null}>
              <Tree
                baubles={baubles}
                setBaubles={setBaubles}
                setBaublePreview={setBaublePreview}
                history={history}
                pathname={pathname}
              />
              <Baubles
                baubles={baubles}
                history={history}
                pathname={pathname}
              />
            </Suspense>
            {baublePreview && pathname == ROUTES.add ? baublePreview : ''};
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default CanvasWrapper;
