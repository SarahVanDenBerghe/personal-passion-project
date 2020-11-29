import React, {
  useState,
  Suspense,
  useContext,
  useEffect,
  useReference,
} from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows, OrbitControls, PerspectiveCamera, Html } from 'drei';
import { Lights, Tree, Floor, Baubles } from '..';
import { BaublesProvider } from '../../../contexts/index';
import { ViewContext } from '../../../contexts/ViewContext';
import { Sidebar } from '../../UI';
import { useSpring, animated, config } from 'react-spring';
import { BaublesContext } from '../../../contexts/BaublesContext';

// https://codesandbox.io/s/threeact-test-5s1m0?file=/src/components/App/App.tsx:1361-1370

softShadows();

// const Camera = () => {
//   useFrame(({ clock, camera }) => {
//     camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30;
//     // camera.rotation.x = camera.rotation.y += 0.05;
//   });
//   return null;
// }

const CanvasWrapper = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [baublePreview, setBaublePreview] = useState(null);
  const [view, setView] = useContext(ViewContext);
  const [detail, setDetail] = useContext(DetailContext);
  const [position, setPosition] = useState([-7, 10, 3]);
  const [isAnimating, setIsAnimating] = useState(false);
  const AnimatedOrbitControls = animated(OrbitControls);
  let selectedItemIndex;

  // useEffect(() => {
  //   if (detail) {
  //     // setPosition([detail.x + 2, detail.y - 1.8, detail.z + 3]);
  //   } else {
  //     // console.log('back')
  //   }
  // }, [detail]);

  const [cameraValues, setCameraValues] = useState({
    cachedPos: [-7, 0, 5],
    cachedTarget: [0, 0, 0],
    pos: [-7, 0, 5],
    target: [0, 0, 0],
    autoRotate: true,
  });

  const spring = useSpring({
    pos: cameraValues.pos,
    target: cameraValues.target,
    from: {
      pos: cameraValues.cachedPos,
      target: cameraValues.cachedTarget,
    },
    config: config.slow,
    onRest: () => setIsAnimating(false),
  });

  const clickTest = (id) => {
    if (selectedItemIndex !== id && !isAnimating) {
      selectedItemIndex = id;
      const selectedBauble = baubles.find((bauble) => bauble.id === id);
      setIsAnimating(true);
      setCameraValues({
        cachedPos: cameraValues.pos,
        cachedTarget: cameraValues.cachedTarget,
        pos: [selectedBauble.x, selectedBauble.y, selectedBauble.z],
        target: cameraValues.cachedTarget, // blijven kijken naar 0, 0, 0
        autoRotate: id === 0,
      });
    }
  };

  const props = useSpring({
    pos: cameraValues.pos
  });

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: props.pos, rotation: [0, 0, 0] }}
      >
        {/* <PerspectiveCamera makeDefault position={[-7, 0, 5]} rotation={[0, 0, 0]} /> */}
        <Lights />
        <group>
          <Floor />
          <Suspense fallback={null}>
            <group>
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
            </group>
          </Suspense>
          {baublePreview && view === VIEWS.edit ? baublePreview : ''};
        </group>
        <OrbitControls />
        {/* <AnimatedOrbitControls
          enableKeys={false}
          enablePan={false}
          target={spring.target}
        /> */}
        {/* <Camera /> */}
      </Canvas>
      <Sidebar setDetail={setDetail} detail={detail} />
    </>
  );
};

export default CanvasWrapper;
