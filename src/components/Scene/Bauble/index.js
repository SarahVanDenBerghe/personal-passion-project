import React, { useEffect, useState, useRef } from 'react';
import { ROUTES } from '../../../consts';
import { useSpring, a } from 'react-spring/three';
import { Html, Sphere, Plane } from 'drei';
import styles from './styles.module.scss';
import { useStore } from '../../../hooks';
import { observer } from 'mobx-react-lite';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import imgTest from '../../../assets/test.jpg';

const Bauble = observer(({ bauble, args, preview, pathname, history }) => {
  const [texture, setTexture] = useState(null);
  const { treeStore } = useStore();
  const [hovered, setHover] = useState(false);
  const isUser = bauble.origin == 'user';
  let sphereRef = useRef(null);

  const textureFromLoader = useLoader(
    THREE.TextureLoader,
    bauble.style === 'image' ? process.env.REACT_APP_STRAPI_API + bauble.image.url : imgTest
  );
  textureFromLoader.offset.x = -0.2;

  useEffect(() => {
    const center = new THREE.Vector3(0, bauble.y, 0);
    sphereRef.lookAt(center);
  }, [sphereRef]);

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
    <Sphere
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
        <meshBasicMaterial attach="material" map={textureFromLoader} color={bauble.color} />
      ) : (
        <meshStandardMaterial attach="material" color={bauble.color} />
      )}
    </Sphere>

    // <a.mesh
    //   position={position}
    //   castShadow
    //   scale={animate.scale}
    //   onPointerOver={(e) => toggleInfo(e)}
    //   onPointerOut={(e) => toggleInfo(e)}
    //   onClick={(e) => handleClickBauble(e)}
    // >
    //   {hovered && !preview && !isUser && (
    //     <Html className={styles.info} center>
    //       <p>{bauble && bauble.name}</p>
    //     </Html>
    //   )}
    //   <sphereBufferGeometry attach="geometry" args={args} />
    //   <meshStandardMaterial
    //     attach="material"
    //     map={img}
    //     // color={color}
    //     // opacity={0.1}
    //     // transparent={preview ? true : false}
    //   />
    // </a.mesh>
  );
});

export default Bauble;
