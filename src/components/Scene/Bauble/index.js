import React, { useState } from 'react';
import { ROUTES } from '../../../consts';
import { useSpring, a } from 'react-spring/three';
import { Html } from 'drei';
import './styles.scss';

const Bauble = ({
  position,
  color,
  bauble,
  args,
  preview,
  pathname,
  history,
}) => {
  const [hovered, setHover] = useState(false);

  const toggleInfo = (e) => {
    if (pathname !== ROUTES.add) {
      e.stopPropagation();
      setHover(!hovered);
    }
  };

  const handleClickBauble = (e) => {
    e.stopPropagation();

    if (pathname !== ROUTES.add) {
      history.push(ROUTES.detail.to + bauble.id);
    }
  };

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
          <p>{bauble && bauble.id}</p>
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
