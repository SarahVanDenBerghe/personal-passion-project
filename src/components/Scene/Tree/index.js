import React, { useContext } from 'react';
import { Bauble } from '..';
import axios from 'axios';
import { useGLTFLoader } from 'drei';
import { VIEWS } from '../../../consts/views';


const api = axios.create({
  baseURL: `${process.env.REACT_APP_STRAPI_API}/messages`,
});

const Tree = ({ setBaublePreview, view, setView, baubles, setBaubles }) => {
  const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);

  const addBauble = (point) => {
    if (view === VIEWS.edit) {
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
          setView(VIEWS.default);
        });
    }
  };

  const showBaublePreview = (point) => {
    // Geeft problemen!!!
    setBaublePreview(
      <Bauble
        preview
        position={[point.x, point.y, point.z]}
        color="blue"
        args={[0.2, 10, 10]}
      />
    );
  };

  return (
    <>
      <mesh
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
