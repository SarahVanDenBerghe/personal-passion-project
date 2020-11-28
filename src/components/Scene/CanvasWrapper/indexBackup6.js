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

softShadows();

const CameraControls = ({ view }) => {
  const camera = useRef(null);
  const controls = useRef(null);
  const vec = new THREE.Vector3(0, 2, 20);
  let currDistance = 0;
  let factor = 0;
  let zoomDistance = view == 'detail' ? 6 : 10;
  const [distance, setDistance] = useState(15);

  // ZOOM: https://codepen.io/Sphinxxxx/pen/yPZQMV
  // SMOOTH: https://codesandbox.io/s/react-three-fiber-spring-orbit-test-2-od2tt?from-embed=&file=/src/index.js:734-929

  // const { z } = useSpring({
  //   from: { z: distance },
  //   z: 5,
  //   config: {
  //     mass: 0.5,
  //     tension: 100,
  //     friction: 100,
  //   },
  // });

  useEffect(() => {
    camera.current.lookAt(0, 0, 0);
  }, []);

  useFrame((state) => {
    // camera.current.position.z =
    //   5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2;

    // CAMERA & CONTROL :https://stackoverflow.com/questions/37482231/camera-position-changes-in-three-orbitcontrols-in-three-js
    currDistance = camera.current.position.length();
    // setDistance(currDistance);
    factor = zoomDistance / currDistance;

    camera.current.position.x *= factor;
    camera.current.position.y *= factor;
    camera.current.position.z *= factor;

    // camera.current.position.x *= factor;
    // camera.current.position.y *= factor;
    // camera.current.position.z *= factor;

    // if (view == 'detail') {
    //   camera.current.position.z = z.value;
    //   controls.current.update();
    // }

    // contol
    controls.current.update();
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 10]}
        // rotation={[0, 0, 0]}
        ref={camera}
      />
      <OrbitControls
        enableKeys={false}
        enablePan={false}
        enableZoom={false}
        // enableRotate={false}
        enableDamping={false}
        target={[0, 0, 0]}
        zoom={3}
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
  const [groupPos, setGroupPos] = useState([0, 0, 0]);

  // useEffect(() => {

  // }, [view]);

  useEffect(() => {
    if (view == 'detail') {
      setGroupPos([0, 0, 2]);
    } else {
      setGroupPos([0, 0, 0]);
    }
  }, [view]);

  const spring = useSpring({
    group: groupPos,
  });

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        resize={{ scroll: false }}
        // camera={{ position: [-7, 0, 5], rotation: [0, 0, 0] }}
      >
        <CameraControls setCameraZoom={setCameraZoom} view={view} />
        <a.group position={spring.group}>
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
            />
          </Suspense>
          {baublePreview && view === VIEWS.edit ? baublePreview : ''};
        </a.group>
      </Canvas>
      <Sidebar setDetail={setDetail} detail={detail} />
    </>
  );
};

export default CanvasWrapper;
