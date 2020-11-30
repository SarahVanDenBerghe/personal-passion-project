import React, { useRef } from 'react';
import { useGLTFLoader } from 'drei';
import { ROUTES } from '../../../consts';
import Bauble from '../../../models/Bauble';
import { useBaublesStore } from '../../../hooks';

const Tree = ({ setBaublePreview, navigate, pathname }) => {
  const baublesStore = useBaublesStore();
  const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);
  const mesh = useRef();

  const addBauble = (point) => {
    if (pathname === ROUTES.add.to) {
      new Bauble({
        x: point.x,
        y: point.y,
        z: point.z,
        store: baublesStore,
        origin: 'user',
      });
    }
  };

  const showBaublePreview = (point) => {
    // setBaublePreview(
    //   <Bauble
    //     preview
    //     position={[point.x, point.y, point.z]}
    //     color="blue"
    //     args={[0.2, 10, 10]}
    //     navigate={navigate}
    //     pathname={pathname}
    //   />
    // );
  };

  return (
    <>
      <mesh
        useRef={mesh}
        position={[0, -5, 0]}
        onPointerDown={(e) => addBauble(e.point)}
        onPointerMove={(e) => showBaublePreview(e.point)}
      >
        <primitive object={gltf.scene} dispose={null} />
      </mesh>
    </>
  );
};

export default Tree;
