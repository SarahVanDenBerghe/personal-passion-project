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

  const addBauble = (e) => {
    const addBaublePath = ROUTES.tree.to + id + ROUTES.add.firststep;
    const baubleUser = baublesStore.baubleFromUser;

    if (pathname === addBaublePath && !baubleUser) {
      new Bauble({
        x: e.point.x,
        y: e.point.y,
        z: e.point.z,
        store: baublesStore,
        origin: 'user',
      });
      history.push(ROUTES.tree.to + id + ROUTES.add.secondstep);
    }
  };

  const showBaublePreview = (e) => {
    e.stopPropagation();
    if (showPreview) {
      setPreviewLocation([e.point.x, e.point.y, e.point.z]);
    }
  };

  return (
    <>
      <mesh
        useRef={mesh}
        position={[0, -5, 0]}
        onPointerDown={(e) => addBauble(e)}
        onPointerMove={(e) => showBaublePreview(e)}
      >
        <primitive object={gltf.scene} dispose={null} />
      </mesh>
    </>
  );
};

export default Tree;
