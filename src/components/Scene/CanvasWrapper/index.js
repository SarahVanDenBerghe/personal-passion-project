import React, { useState, Suspense, useContext } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows, OrbitControls } from 'drei';
import { Lights, Tree, Floor, Baubles } from '../';
import { BaublesProvider } from '../../../contexts/index';
import { ViewContext } from '../../../contexts/ViewContext';
import { DetailContext } from '../../../contexts/DetailContext';
import { VIEWS } from '../../../consts/views';
import { Sidebar } from '../../UI';

softShadows();
const CanvasWrapper = () => {
  const [baublePreview, setBaublePreview] = useState(null);
  const [view, setView] = useContext(ViewContext);
  const [detail, setDetail] = useContext(DetailContext);

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-7, 10, 3], fov: 60 }}
      >
        <BaublesProvider>
          <Lights />
          <group>
            <Floor />
            <Suspense fallback={null}>
              <Tree
                setView={setView}
                view={view}
                setBaublePreview={setBaublePreview}
              />
            </Suspense>
            <Baubles setDetail={setDetail} />
            {baublePreview && view === VIEWS.edit ? baublePreview : ''};
          </group>
          <OrbitControls />
        </BaublesProvider>
      </Canvas>
      {detail && <Sidebar detail={detail} />}
    </>
  );
};

export default CanvasWrapper;
