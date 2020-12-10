import React, { useEffect, useState, useRef } from 'react';
import { ROUTES } from '../../../consts';
import { useSpring } from 'react-spring/three';
import { Html, Sphere } from 'drei';
import styles from './styles.module.scss';
import { useStore } from '../../../hooks';
import { observer } from 'mobx-react-lite';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import imgTest from '../../../assets/test.jpg';

const Bauble = observer(({ bauble, args, preview, pathname, history }) => {
  const { treeStore } = useStore();
  const [hovered, setHover] = useState(false);
  const [texture, setTexture] = useState(null);
  const isUser = bauble.origin === 'user';
  let sphereRef = useRef(null);

  const getImage = () => {
    if (bauble.style === 'image' && bauble.origin === 'user') {
      return bauble.image;
    } else if (bauble.style === 'image' && bauble.origin === 'data') {
      return process.env.REACT_APP_STRAPI_API + bauble.image.url;
    }
  };

  const textureFromLoader =  bauble.style === 'image' ? useLoader(THREE.TextureLoader, getImage() : imgTest);

  useEffect(() => {
    if (bauble.style === 'image') {
      // textureFromLoader.offset.x = -0.2;
      setTexture(textureFromLoader);
    }
  }, [bauble.style]);

  // const textureFromLoader = useLoader(THREE.TextureLoader, bauble.style === 'image' ? getImage() : imgTest);
  // textureFromLoader.minFilter = THREE.LinearFilter;
  // textureFromLoader.offset.x = -0.2;

  useEffect(() => {
    const center = new THREE.Vector3(0, bauble.y, 0);
    sphereRef.lookAt(center);
  }, [sphereRef, bauble.y]);

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

  const getColor = (color) => {
    switch (color) {
      case 'red':
        return `${styles.red}`;
      case 'blue':
        return `${styles.blue}`;
      case 'green':
        return `${styles.green}`;
      default:
        return '#ffffff;';
    }
  };

  return (
    <Sphere
      castShadow
      position={[bauble.x, bauble.y, bauble.z]}
      args={args}
      onPointerOver={(e) => toggleInfo(e)}
      onPointerOut={(e) => toggleInfo(e)}
      onClick={(e) => handleClickBauble(e)}
      ref={(el) => {
        sphereRef = el;
      }}
    >
      {hovered && !preview && !isUser && (
        <Html className={styles.info} center>
          <p>{bauble && bauble.name}</p>
        </Html>
      )}

      {bauble.style === 'image' ? (
        <meshLambertMaterial attach="material" map={texture} />
      ) : (
        <meshStandardMaterial attach="material" color={getColor(bauble.color)} />
      )}
    </Sphere>
  );
});

export default Bauble;
