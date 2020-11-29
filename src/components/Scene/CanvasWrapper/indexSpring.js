import React, { useState, Suspense, useContext, useEffect, useRef } from 'react';
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

softShadows();

const CameraControls = ({ view }) => {
  const { gl, camera } = useThree();
  const [position, setPosition] = useState({ x: 0, y: 0, z: 5 });
  const [zoom, setZoom] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cachedView, setCachedView] = useState(view);
  const [viewHasChanged, setViewHasChanged] = useState(false);
  const controls = useRef(null);

  let currDistance = 0;
  let factor = 0;

  let allowEdit = false;

  useEffect(() => {
    // bij het veranderen van view
    if (view == 'detail') {
      setIsAnimating(true);
    }
    const zoomDistance = view == 'detail' ? 8 : 10;
    setZoom(zoomDistance);

    currDistance = camera.position.length();
    factor = zoom / currDistance;
    const x = camera.position.x * factor;
    const y = camera.position.y * factor;
    const z = camera.position.z * factor;
  }, [view]);

  // On start
  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 300;

    gsap.to(camera.position, {
      duration: 2,
      ease: 'Power2.easeOut',
      z: 8,
      // onComplete: console.log('done'),
      onComplete: () => controls.current.update(),
    });
  }, []);

  useSpring({
    from: {
      // From position is dynamic (orbit controls)
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    },

    // New calculated position to zoom in
    x: position.x,
    y: position.y,
    z: position.z,

    onFrame: ({ x, y, z }) => {
      currDistance = camera.position.length();
      factor = zoom / currDistance; // zoom is 6 on detail else 10

      setPosition({
        x: (camera.position.x *= factor),
        y: (camera.position.y *= factor),
        z: (camera.position.z *= factor),
      });

      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
    },
    onRest: () => {
      if (view == 'detail') {
        setIsAnimating(false);
      }
    },
  });

  //codesandbox.io/s/r3f-basic-demo-f8zii?file=/src/index.js:492-612

  return (
    <>
      <OrbitControls
        enableKeys={false}
        enablePan={false}
        enableZoom={false}
        enableDamping={false}
        // enableRotate={view == 'detail' ? false : true}
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
  const [groupPos, setGroupPos] = useState([0, 0, 0]);

  // useEffect(() => {

  // }, [view]);

  useEffect(() => {
    // if (view == 'detail') {
    //   setGroupPos([0, 0, 2]);
    // } else {
    //   setGroupPos([0, 0, 0]);
    // }
  }, [view]);

  const spring = useSpring({
    group: groupPos,
  });

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        // resize={{ scroll: false }}
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
            <Baubles view={view} setView={setView} baubles={baubles} setDetail={setDetail} />
          </Suspense>
          {baublePreview && view === VIEWS.edit ? baublePreview : ''};
        </a.group>
      </Canvas>
      <Sidebar setDetail={setDetail} detail={detail} />
    </>
  );
};

export default CanvasWrapper;
