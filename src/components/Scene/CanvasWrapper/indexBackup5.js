import React, { useState, Suspense, useContext, useEffect } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { softShadows, OrbitControls, PerspectiveCamera } from 'drei';
import { Lights, Tree, Floor, Baubles } from '..';
import { ViewContext } from '../../../contexts/ViewContext';
import { DetailContext } from '../../../contexts/DetailContext';
import { VIEWS } from '../../../consts/views';
import { Sidebar } from '../../UI';
import { useSpring, a } from 'react-spring/three';
import { BaublesContext } from '../../../contexts/BaublesContext';

softShadows();

const CameraControl = ({ hasClicked }) => {

  /* trying to create a smooth zoom with useSpring */
  const spring = useSpring({
    zoom: hasClicked ? 10 : 5,
  });

  return (
    <PerspectiveCamera makeDefault position={[-7, 0, hasClicked ? 10 : 5]} />
  ); // putting 'a' in front gives error, but spring.zoom isn't working without I think
};

const CanvasWrapper = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [baublePreview, setBaublePreview] = useState(null);
  const [view, setView] = useContext(ViewContext);
  const [detail, setDetail] = useContext(DetailContext);
  const [groupPos, setGroupPos] = useState([0, 0, 0]);
  const [cameraZoom, setCameraZoom] = useState(5);

  const [hasClicked, setHasClicked] = useState(false);

  const clickTest = () => {
    setHasClicked(true);
    // setGroupPos([0, 0, 3]);
    /* huidige positie vinden of lookat??? */
  };

  const spring = useSpring({
    group: groupPos,
  });
  

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        // camera={{ position: [-7, 0, cameraZoom], rotation: [0, 0, 0] }}
      >
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
              clickTest={clickTest}
              setDetail={setDetail}
            />
          </Suspense>
          {baublePreview && view === VIEWS.edit ? baublePreview : ''};
        </a.group>
        <OrbitControls />
        <CameraControl setCameraZoom={setCameraZoom} hasClicked={hasClicked} />
      </Canvas>
      <Sidebar setDetail={setDetail} detail={detail} />
    </>
  );
};

export default CanvasWrapper;
