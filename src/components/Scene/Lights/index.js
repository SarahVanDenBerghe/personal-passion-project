import React from 'react';

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight
        castShadow
        position={[0, 12, 0]}
        intensity={0.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight castShadow position={[0, -10, 0]} intensity={0.1} />
      <pointLight castShadow position={[0, 30, 0]} intensity={0.1} />
    </>
  );
};

export default Lights;
