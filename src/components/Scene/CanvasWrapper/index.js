import React, { useState, Suspense, useContext } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows, OrbitControls, Html } from 'drei';
import { Lights, Tree, Floor, Baubles, Add } from '../';
import { BaublesProvider, ViewProvider } from '../../../contexts/index';
import { ViewContext } from '../../../contexts/ViewContext';
import { VIEWS } from '../../../consts/views'

softShadows();
const CanvasWrapper = () => {
  const [baublePreview, setBaublePreview] = useState(null);
  const [view, setView] = useContext(ViewContext);

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
                <Tree setView={setView} view={view} setBaublePreview={setBaublePreview} />
              </Suspense>
              <Baubles />
              {baublePreview && view === VIEWS.edit ? baublePreview : ''};
            </group>
            <OrbitControls />
        </BaublesProvider>
      </Canvas>
    </>
  );
};

export default CanvasWrapper;
