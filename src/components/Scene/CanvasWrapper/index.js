import React, {
  useState,
  Suspense,
  useContext,
  useRef,
} from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Lights, Tree, Floor, Baubles, CameraControls } from '..';
import { BaublesContext } from '../../../contexts/BaublesContext';
import { useHistory, useLocation} from 'react-router';
import { ROUTES } from '../../../consts';
import './styles.scss';

softShadows();
const CanvasWrapper = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [baublePreview, setBaublePreview] = useState(null);
  const canvas = useRef(null);
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <>
      <div className="canvas--wrapper" ref={canvas}>
        <Canvas colorManagement shadowMap resize={{ scroll: false }}>
          <CameraControls
            pathname={pathname}
            canvas={canvas}
            baubles={baubles}
           />
          <group>
            <Lights />
            <Floor />
            <Suspense fallback={null}>
              <Tree
                baubles={baubles}
                setBaubles={setBaubles}
                setBaublePreview={setBaublePreview}
                history={history}
                pathname={pathname}
              />
              <Baubles
                baubles={baubles}
                history={history}
                pathname={pathname}
              />
            </Suspense>
            {baublePreview && pathname == ROUTES.add ? baublePreview : ''};
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default CanvasWrapper;
