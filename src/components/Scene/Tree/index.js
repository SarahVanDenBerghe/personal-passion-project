import React, { useRef } from 'react';
import { useGLTFLoader } from 'drei';
import { ROUTES } from '../../../consts';
import Bauble from '../../../models/Bauble';
import { useStore } from '../../../hooks';

const Tree = ({ showPreview, setPreviewLocation, history, pathname }) => {
  const { baublesStore } = useStore();
  const gltf = useGLTFLoader('/scene/tree_star.glb', true);
  const mesh = useRef();
  const id = pathname.split('/')[2];

  const addBauble = (point) => {
    const addBaublePath = ROUTES.tree.to + id + ROUTES.add.firststep;
    const baubleUser = baublesStore.baubleFromUser;

    if (pathname === addBaublePath && !baubleUser) {
      new Bauble({
        x: point.x,
        y: point.y,
        z: point.z,
        store: baublesStore,
        origin: 'user',
      });
      history.push(ROUTES.tree.to + id + ROUTES.add.secondstep);
    }
  };

  const showBaublePreview = (point) => {
    if (showPreview) {
      setPreviewLocation([point.x, point.y, point.z]);
    }
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
