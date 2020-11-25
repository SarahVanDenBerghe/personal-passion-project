import React, {
  useState,
  Suspense,
  useContext,
  useEffect,
  useReference,
} from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows, OrbitControls, PerspectiveCamera } from 'drei';
import { Lights, Tree, Floor, Baubles } from '../';
import { BaublesProvider } from '../../../contexts/index';
import { ViewContext } from '../../../contexts/ViewContext';
import { DetailContext } from '../../../contexts/DetailContext';
import { VIEWS } from '../../../consts/views';
import { Sidebar } from '../../UI';
import { useSpring, animated, config } from 'react-spring';
import { BaublesContext } from '../../../contexts/BaublesContext';

// https://codesandbox.io/s/threeact-test-5s1m0?file=/src/components/App/App.tsx:1361-1370

softShadows();

const CanvasWrapper = () => {
  const [baubles, setBaubles] = useContext(BaublesContext);
  const [baublePreview, setBaublePreview] = useState(null);
  const [view, setView] = useContext(ViewContext);
  const [detail, setDetail] = useContext(DetailContext);
  const [position, setPosition] = useState([-7, 10, 3]);
  const [isAnimating, setIsAnimating] = useState(false);
  let selectedItemIndex;
  const AnimatedOrbitControls = animated(OrbitControls);

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
        pos: [selectedBauble.x, selectedBauble.y, selectedBauble. z],
        target: cameraValues.cachedTarget, // blijven kijken naar 0, 0, 0
        autoRotate: id === 0,
      });
    }
  };

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: cameraValues.pos, rotation: [0, 0, 0] }}
      >
        <Lights />
        <group>
          <Floor />
          <Suspense fallback={null}>
            <Tree
              baubles={baubles}
              setBaubles={setBaubles}
              setView={setView}
              view={view}
              setBaublePreview={setBaublePreview}
            />
          </Suspense>
          <Baubles
            view={view}
            setView={setView}
            baubles={baubles}
            clickTest={clickTest}
            setDetail={setDetail}
          />
          {baublePreview && view === VIEWS.edit ? baublePreview : ''};
        </group>
        <OrbitControls />
        {/* <AnimatedOrbitControls
          enableKeys={false}
          enablePan={false}
          target={spring.target}
        /> */}
      </Canvas>
      <Sidebar setDetail={setDetail} detail={detail} />
      {/* {detail && <Sidebar setDetail={setDetail} detail={detail} />} */}
    </>
  );
};

export default CanvasWrapper;
