import React, { useState, Suspense, useContext, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Lights, Tree, Floor, Baubles, CameraControls } from '..';
import { useHistory, useLocation } from 'react-router';
import { ROUTES } from '../../../consts';
import { useSpring, a } from 'react-spring/three';
import { useBaublesStore } from '../../../hooks';
import './styles.scss';

softShadows();
const CanvasWrapper = () => {
  const baublesStore = useBaublesStore();
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
          <CameraControls
            pathname={pathname}
            canvas={canvas}
            baubles={baublesStore.baubles}
            setGroupPos={setGroupPos}
          />
          <Lights />
          <Floor />
          <a.group position={spring.group}>
            <Suspense fallback={null}>
              <Tree
                baubles={baublesStore.baubles}
                setBaublePreview={setBaublePreview}
                history={history}
                pathname={pathname}
              />
              <Baubles baubles={baublesStore.baubles} history={history} pathname={pathname} />
            </Suspense>
          </a.group>
          {baublePreview && pathname == ROUTES.add ? baublePreview : ''};
        </Canvas>
      </div>
    </>
  );
};

export default CanvasWrapper;
