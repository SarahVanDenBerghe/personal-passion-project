import React, { useEffect, useState, useRef } from 'react';
import { ROUTES } from '../../../consts';
import { Html, Sphere } from 'drei';
import styles from './styles.module.scss';
import { useStore } from '../../../hooks';
import { observer } from 'mobx-react-lite';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import img from '../../../assets/icons/image.svg';

const Bauble = observer(({ bauble, args, pathname, history, preview }) => {
  const { treeStore } = useStore();
  const [hovered, setHover] = useState(false);
  const isUser = bauble.origin === 'user';
  let sphereRef = useRef(null);

  const getImage = () => {
    if ((bauble.style === 'image' && bauble.origin === 'user') || bauble.origin === 'socket') {
      return bauble.image.url;
    } else if (bauble.style === 'image' && bauble.origin === 'data') {
      return process.env.REACT_APP_STRAPI_API + bauble.image.url;
    }
  };

  const textureFromLoader = useLoader(THREE.TextureLoader, bauble.style === 'image' ? getImage() : img);
  textureFromLoader.minFilter = THREE.LinearFilter;
  textureFromLoader.offset.x = -0.25;

  useEffect(() => {
    const center = new THREE.Vector3(0, bauble.y, 0);
    sphereRef.lookAt(center);
  }, [sphereRef, bauble.y]);

  const toggleInfo = (e) => {
    if (pathname.split('/').includes('add') === false) {
      e.stopPropagation();
      setHover(!hovered);
    }
  };

  const handleClickBauble = (e) => {
    e.stopPropagation();

    if (pathname.split('/').includes('add') === false) {
      history.push(ROUTES.tree.to + treeStore.currentTree.id + ROUTES.detail.to + bauble.id);
    }
  };

  const getColor = (color) => {
    switch (color) {
      case 'red':
        return `${styles.red}`;
      case 'blue':
        return `${styles.blue}`;
      case 'green':
        return `${styles.green}`;
      default:
        return 'white';
    }
  };

  const events = {
    onPointerOver: (e) => toggleInfo(e),
    onPointerOut: (e) => toggleInfo(e),
    onClick: (e) => handleClickBauble(e),
    onPointerDown: (e) => handleClickBauble(e),
  };

  return (
    <Sphere
      position={[bauble.x, bauble.y, bauble.z]}
      args={args}
      {...(!preview && events)}
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
        <meshLambertMaterial attach="material" map={textureFromLoader} />
      ) : (
        <meshStandardMaterial
          attach="material"
          color={getColor(bauble.color)}
          opacity={preview ? 0.3 : 1}
          transparent={preview ? true : false}
        />
      )}
    </Sphere>
  );
});

export default Bauble;
