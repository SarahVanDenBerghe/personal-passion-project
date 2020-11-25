import React, { useContext, useEffect, useRef } from 'react';
import { Bauble } from '..';
import axios from 'axios';
import { useGLTFLoader } from 'drei';
import { VIEWS } from '../../../consts/views';
import { gsap } from 'gsap';

const Tree = ({ setBaublePreview, view, setView, baubles, setBaubles }) => {
  const tree = useRef(null);
  const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_STRAPI_API}/messages`,
  });

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

  useEffect(() => {
    gsap.to(tree.current, {
      duration: 0.8,
      ease: 'Power2.easeIn',
      opacity: 0,
      scale: 0,
      transformOrigin: '50% 50%',
    });
  });

  return (
    <>
      <mesh
        useRef={tree}
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
