import React, { useState, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows, OrbitControls, Html } from 'drei';
import { Navbar, Button } from './components/UI';
import { Lights, Tree, Floor, Baubles } from './components/Scene';
import { BaublesProvider } from './contexts/BaublesContext';
import './App.scss';

softShadows();
const App = () => {
  const [baublePreview, setBaublePreview] = useState(null);

  return (
    <>
      <BaublesProvider>
        <div className="noise"></div>
        <Navbar />
        <div className="button--add">
          <Button />
        </div>
        <Canvas
          colorManagement
          shadowMap
          camera={{ position: [-7, 10, 3], fov: 60 }}
        >
          <Lights />
          <group>
            <Floor />
            <BaublesProvider>
              <Suspense fallback={null}>
                <Tree setBaublePreview={setBaublePreview} />
              </Suspense>
              <Baubles />
              {baublePreview ? baublePreview : ''};
            </BaublesProvider>
          </group>
          <OrbitControls />
        </Canvas>
      </BaublesProvider>
    </>
  );
};

export default App;
