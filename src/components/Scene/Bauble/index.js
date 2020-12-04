import React, { useEffect, useState } from 'react';
import { ROUTES } from '../../../consts';
import { useSpring, a } from 'react-spring/three';
import { Html } from 'drei';
import styles from './styles.module.scss';
import { useStore } from '../../../hooks';
import { observer } from 'mobx-react-lite';

const Bauble = observer(({ position, color, bauble, args, preview, pathname, history }) => {
  const { treeStore } = useStore();
  const [hovered, setHover] = useState(false);
  const isUser = bauble.origin == 'user';

  const toggleInfo = (e) => {
    if (pathname !== ROUTES.add.to) {
      e.stopPropagation();
      setHover(!hovered);
    }
  };

  const handleClickBauble = (e) => {
    e.stopPropagation();

    if (pathname !== ROUTES.add.to) {
      history.push(ROUTES.tree.to + treeStore.currentTree.id + ROUTES.detail.to + bauble.id);
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
      {hovered && !preview && !isUser && (
        <Html className={styles.info} center>
          <p>{bauble && bauble.name}</p>
        </Html>
      )}
      <sphereBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} opacity={0.1} transparent={preview ? true : false} />
    </a.mesh>
  );
});

export default Bauble;
