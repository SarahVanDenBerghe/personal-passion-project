import React, { useState, Suspense, useContext, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Lights, Tree, Floor, Baubles, CameraControls } from '..';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { useSpring, a } from 'react-spring/three';
import './styles.scss';

softShadows();
const CanvasWrapper = () => {
  const [baublePreview, setBaublePreview] = useState(null);
  const [groupPos, setGroupPos] = useState([0, 0, 0]);
  const canvas = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const spring = useSpring({
    group: groupPos,
  });

  return (
    <>
      <div className="canvas__wrapper" ref={canvas}>
        <Canvas colorManagement shadowMap resize={{ scroll: false }}>
          <CameraControls pathname={pathname} canvas={canvas} setGroupPos={setGroupPos} />
          <Lights />
          <Floor />
          <a.group position={spring.group}>
            <Suspense fallback={null}>
              <Tree setBaublePreview={setBaublePreview} navigate={navigate} pathname={pathname} />
              <Baubles navigate={navigate} pathname={pathname} />
            </Suspense>
          </a.group>
          {baublePreview && pathname == ROUTES.add.to ? baublePreview : ''};
        </Canvas>
      </div>
    </>
  );
};

export default CanvasWrapper;
