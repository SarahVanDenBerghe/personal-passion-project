import React, { useState, Suspense, useContext, useRef, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Lights, Tree, Floor, Baubles, CameraControls } from '..';
import { BaublesContext } from '../../../contexts/BaublesContext';
import { useHistory, useLocation } from 'react-router';
import { ROUTES } from '../../../consts';
import { useSpring, a } from 'react-spring/three';
import './styles.scss';

softShadows();
const CanvasWrapper = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [baublePreview, setBaublePreview] = useState(null);
  const [groupPos, setGroupPos] = useState([0, 0, 0]);
  const canvas = useRef(null);
  const history = useHistory();
  const { pathname } = useLocation();

  const spring = useSpring({
    group: groupPos,
  });

  return (
    <>
      <div className="canvas__wrapper" ref={canvas}>
        <Canvas colorManagement shadowMap resize={{ scroll: false }}>
          <CameraControls pathname={pathname} canvas={canvas} baubles={baubles} setGroupPos={setGroupPos} />
          <Lights />
          <Floor />
          <a.group position={spring.group}>
            <Suspense fallback={null}>
              <Tree
                baubles={baubles}
                setBaubles={setBaubles}
                setBaublePreview={setBaublePreview}
                history={history}
                pathname={pathname}
              />
              <Baubles baubles={baubles} history={history} pathname={pathname} />
            </Suspense>
          </a.group>
          {baublePreview && pathname == ROUTES.add ? baublePreview : ''};
        </Canvas>
      </div>
    </>
  );
};

export default CanvasWrapper;
