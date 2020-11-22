import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { Html } from 'drei';

const Bauble = ({ position, color, id, args, preview }) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const testje = (e) => {
    e.stopPropagation();
    setHover(!hovered);
  }


  return (
    <mesh
      position={position}
      castShadow
      onPointerOver={(e) => testje(e)}
      onPointerOut={(e) => testje(e)}
    >
      {hovered && (
        <Html center>
          <p>{id}</p>
        </Html>
      )}
      <sphereBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial
        attach="material"
        color={color}
        opacity={0.1}
        transparent={preview ? true : false}
      />
    </mesh>
  );
};

export default Bauble;
