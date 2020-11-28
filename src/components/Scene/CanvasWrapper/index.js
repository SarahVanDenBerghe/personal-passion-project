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
import { ViewContext } from '../../../contexts/ViewContext';
import { DetailContext } from '../../../contexts/DetailContext';
import { VIEWS } from '../../../consts/views';
import { Sidebar } from '../../UI';
import { animated } from 'react-spring';
import { useSpring, a } from 'react-spring/three';
import { BaublesContext } from '../../../contexts/BaublesContext';
import { gsap } from 'gsap';
import { useHistory } from 'react-router';
import './styles.scss';

softShadows();

const CameraControls = ({ view, canvas }) => {
  const { gl, camera } = useThree();
  const [zoom, setZoom] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const controls = useRef(null);

  let currDistance = 0;
  let factor = 0;

  const animation = {
    sidebar: {
      xPos: view == 'detail' ? -150 : 0,
    },
  };

  useEffect(() => {
    const zoomDistance = view == VIEWS.default ? 4 : 8;
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
  const [view, setView] = useContext(ViewContext);
  const [detail, setDetail] = useContext(DetailContext);
  const [cameraZoom, setCameraZoom] = useState(5);
  const canvas = useRef(null);
  const history = useHistory();

  return (
    <>
      <div className="canvas--wrapper" ref={canvas}>
        <Canvas colorManagement shadowMap resize={{ scroll: false }}>
          <CameraControls
            canvas={canvas}
            setCameraZoom={setCameraZoom}
            view={view}
          />
          <group>
            <Lights />
            <Floor />
            <Suspense fallback={null}>
              <Tree
                baubles={baubles}
                setBaubles={setBaubles}
                setView={setView}
                view={view}
                setBaublePreview={setBaublePreview}
              />
              <Baubles
                view={view}
                setView={setView}
                baubles={baubles}
                setDetail={setDetail}
                history={history}
              />
            </Suspense>
            {baublePreview && view === VIEWS.edit ? baublePreview : ''};
          </group>
        </Canvas>
      </div>
      <Sidebar setDetail={setDetail} detail={detail} />
    </>
  );
};

export default CanvasWrapper;
