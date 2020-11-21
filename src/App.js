import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows, OrbitControls, Html } from 'drei';
import { Navbar, Button } from './components/UI';
import './App.scss';
import { Lights, Tree, Bauble, Floor, Custom } from './components/Scene';

softShadows();
const App = () => {
  const [baubles, setBaubles] = useState([]);
  const [baublePreview, setBaublePreview] = useState(null);

  return (
    <>
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
          {/* <Tree
            baubles={baubles}
            setBaubles={setBaubles}
            setBaublePreview={setBaublePreview}
            position={[0, 0, 0]}
            color='#669966'
            args={[3, 9, 9]}
            speed={2}
          /> */}
          <Suspense fallback={null}>
            <Custom
              baubles={baubles}
              setBaubles={setBaubles}
              setBaublePreview={setBaublePreview}
            />
          </Suspense>
          {baubles.map((bauble) => {
            return bauble;
          })}
          {baublePreview ? baublePreview : ''};
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default App;
