import React, { useRef } from 'react';
import { useGLTFLoader } from 'drei';
import { ROUTES } from '../../../consts';
import Bauble from '../../../models/Bauble';
import { Preview } from '..';
import { useStore } from '../../../hooks';

const Tree = ({ showPreview, setBaublePreview, history, pathname }) => {
  const { baublesStore } = useStore();
  // const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);
  const gltf = useGLTFLoader('/tree_simple.gltf', true);
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
    // Warning
    if (showPreview) {
      setBaublePreview(<Preview point={point} history={history} pathname={pathname} />);
    }
  };

  return (
    <>
      <mesh
        castShadow
        useRef={mesh}
        position={[0, -5, 0]}
        onPointerDown={(e) => addBauble(e.point)}
        onPointerMove={(e) => showBaublePreview(e.point)}
      >
        {/* <ambientLight color={0x404040} intensity={1.2} /> */}
        <primitive object={gltf.scene} dispose={null} />
      </mesh>
    </>
  );
};

export default Tree;
