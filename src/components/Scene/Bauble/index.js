import React, { useState, useContext } from 'react';
import { useSpring, a } from 'react-spring/three';
import { Html } from 'drei';
import './styles.scss';

const Bauble = ({ position, color, id, args, preview, setDetail }) => {
  const [hovered, setHover] = useState(false);

  const toggleInfo = (e) => {
    e.stopPropagation();
    setHover(!hovered);
  };

  const handleClickBauble = (e) => {
    e.stopPropagation();
    setDetail(id);
  }

  const animate = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
  });

  return (
    <a.mesh
      position={position}
      castShadow
      scale={animate.scale}
      onPointerOver={(e) => toggleInfo(e)}
      onPointerOut={(e) => toggleInfo(e)}
      onClick={(e) => handleClickBauble(e)}
    >
      {hovered && (
        <Html className="info" center>
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
    </a.mesh>
  );
};

export default Bauble;