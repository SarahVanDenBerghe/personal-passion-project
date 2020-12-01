import React, { useRef } from 'react';
import { useGLTFLoader } from 'drei';
import { ROUTES } from '../../../consts';
import Bauble from '../../../models/Bauble';
import { Preview } from '..';
import { useBaublesStore } from '../../../hooks';

const Tree = ({ setBaublePreview, history, pathname }) => {
  const baublesStore = useBaublesStore();
  const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);
  const mesh = useRef();

  const addBauble = (point) => {
    const addBaublePath = `${ROUTES.add.to}/${ROUTES.add.firststep}`;
    if (pathname === addBaublePath) {
      new Bauble({
        x: point.x,
        y: point.y,
        z: point.z,
        store: baublesStore,
        origin: 'user',
      });
    }

    history.push(`${ROUTES.add.to}/${ROUTES.add.secondstep}`);
  };

  const showBaublePreview = (point) => {
    setBaublePreview(<Preview point={point} history={history} pathname={pathname} />);
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
