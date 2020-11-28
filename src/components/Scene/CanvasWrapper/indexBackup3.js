import React, {
  useState,
  Suspense,
  useContext,
  useEffect,
  useReference,
} from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows, OrbitControls, PerspectiveCamera } from 'drei';
import { Lights, Tree, Floor, Baubles } from '..';
import { ViewContext } from '../../../contexts/ViewContext';
import { DetailContext } from '../../../contexts/DetailContext';
import { VIEWS } from '../../../consts/views';
import { Sidebar } from '../../UI';
import { useSpring, animated, config, a } from 'react-spring/three';
import { BaublesContext } from '../../../contexts/BaublesContext';

// https://codesandbox.io/s/threeact-test-5s1m0?file=/src/components/App/App.tsx:1361-1370

softShadows();

const Camera = () => {
  const AnimatedOrbitControls = animated(OrbitControls);

  useFrame(({ clock, camera }) => {
    camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30;
    console.log('test');
    // camera.rotation.x = camera.rotation.y += 0.05;
  });
  return null;
};

const CanvasWrapper = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [baublePreview, setBaublePreview] = useState(null);
  const [view, setView] = useContext(ViewContext);
  const [detail, setDetail] = useContext(DetailContext);

  const [clicked, setClicked] = useState(false);
  const AnimatedOrbitControls = animated(OrbitControls);
  const [position, setPosition] = useState([-7, 0, 5]);
  const [groupPos, setGroupPos] = useState([0, 0, -30]);

  const [cameraValues, setCameraValues] = useState({
    cachedPos: [-7, 0, 5],
    pos: [-7, 0, 5],
  });

  const clickTest = () => {
    setCameraValues({
      cachedPos: cameraValues.pos,
      pos: [-9, 2, 10], // changing position
    });

    setGroupPos([0, 0, 0]);
  };

  // const spring = useSpring({
  //   pos: cameraValues.pos,
  //   from: {
  //     pos: cameraValues.cachedPos,
  //   },
  // });

  const spring = useSpring({
    test: groupPos
  });

  console.log(spring.test);

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: cameraValues.pos, rotation: [0, 0, 0] }}
      >
        <PerspectiveCamera makeDefault position={props.pos} rotation={[0, 0, 0]} />

        <a.group position={spring.test}>
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
              clickTest={clickTest}
              setDetail={setDetail}
            />
          </Suspense>
          {baublePreview && view === VIEWS.edit ? baublePreview : ''};
        </a.group>

        <OrbitControls />
        {/* <Camera /> */}
      </Canvas>
      <Sidebar setDetail={setDetail} detail={detail} />
    </>
  );
};

export default CanvasWrapper;
