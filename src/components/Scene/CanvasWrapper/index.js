import React, { useState, Suspense, useContext, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Lights, Tree, Floor, Baubles, CameraControls } from '..';
import { useHistory, useLocation } from 'react-router';
import { ROUTES } from '../../../consts';
import { useSpring, a } from 'react-spring/three';
import './styles.scss';

softShadows();
const CanvasWrapper = () => {
  const [baublePreview, setBaublePreview] = useState(null);
  const [groupPos, setGroupPos] = useState([0, 0, 0]);
  const canvas = useRef(null);
  const history = useHistory();
  const { pathname } = useLocation();

  const spring = useSpring({
    group: groupPos,
  });

  const showPreview = pathname == `${ROUTES.add.to}/${ROUTES.add.firststep}`;

  return (
    <>
      <div className="canvas__wrapper" ref={canvas}>
        <Canvas colorManagement shadowMap resize={{ scroll: false }}>
          <CameraControls pathname={pathname} canvas={canvas} setGroupPos={setGroupPos} />
          <Lights />
          <Floor />
          <a.group position={spring.group}>
            <Suspense fallback={null}>
              <Tree setBaublePreview={setBaublePreview} history={history} pathname={pathname} />
              <Baubles history={history} pathname={pathname} />
            </Suspense>
          </a.group>
          {baublePreview && showPreview ? baublePreview : ''};
        </Canvas>
      </div>
    </>
  );
};

export default CanvasWrapper;
