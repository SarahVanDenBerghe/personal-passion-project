import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { softShadows, OrbitControls } from "drei";
import { Header } from "./components/ui";
import "./App.scss";
import { Lights, Tree, Floor } from './components/scene';

softShadows();

const App = () => {
  const [baubles, setBaubles] = useState([]);
  const [baublePreview, setBaublePreview] = useState(null); 

  return (
    <>
      <Header />
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-7, 10, 3], fov: 60 }}
        background={'pink'}>
        <Lights />
          <group>
          <Floor />
          <Tree
            baubles={baubles}
            setBaubles={setBaubles}
            setBaublePreview={setBaublePreview}
            position={[0, 0, 0]}
            color='#669966'
            args={[3, 9, 9]}
            speed={2}
          />

          {baubles.map(bauble => { 
            return bauble
          })}

          {baublePreview ? baublePreview : ''};

        </group>
        <OrbitControls 
          // enableZoom={false}
        />
      </Canvas>
    </>
  );
};

export default App;
