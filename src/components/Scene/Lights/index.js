import React from 'react';

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        castShadow
        position={[0, 12, 0]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[0, -10, 0]} intensity={0.1} />
      <pointLight position={[0, 30, 0]} intensity={0.3} />
    </>
  );
};

export default Lights;
