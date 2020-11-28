import React, { useRef } from 'react';
import { Bauble } from '..';
import axios from 'axios';
import { useGLTFLoader } from 'drei';
import { ROUTES } from '../../../consts';

const Tree = ({ setBaublePreview, baubles, setBaubles, history, pathname }) => {
  const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);
  const mesh = useRef();

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_STRAPI_API}/messages`,
  });

  const addBauble = (point) => {
    if (pathname === ROUTES.add) {
      api
        .post('', {
          name: 'Default',
          x: point.x,
          y: point.y,
          z: point.z,
        })
        .then((response) => {
          const newBauble = {
            name: response.data.name,
            x: response.data.x,
            y: response.data.y,
            z: response.data.z,
            id: response.data.id,
          };
          setBaubles([...baubles, newBauble]);
          history.push(ROUTES.home);
        });
    }
  };

  const showBaublePreview = (point) => {
    setBaublePreview(
      <Bauble
        preview
        position={[point.x, point.y, point.z]}
        color="blue"
        args={[0.2, 10, 10]}
        history={history}
        pathname={pathname}
      />
    );
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
