import React, { useState, Suspense, useEffect } from 'react';
import { Bauble } from '../scene';
import axios from 'axios';

import { useGLTFLoader } from 'drei';
const api = axios.create({
  baseURL: `${process.env.REACT_APP_STRAPI_API}?_limit=-1`,
  // baseURL: 'https://xmas-ppp-api.herokuapp.com/messages'
});

const Custom = ({ setBaublePreview, baubles, setBaubles }) => {
  const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);

  useEffect(() => {
    api.get('/').then(async (response) => {
      const getBaubles = response.data.map((bauble) => {
        return (
          <Bauble
            key={bauble.id}
            position={[bauble.x, bauble.y, bauble.z]}
            color="red"
            args={[0.2, 10, 10]}
          />
        );
      });
      setBaubles(getBaubles);
    });
  }, [setBaubles]);

  // Probleem online
  const addBauble = (point) => {
    api
      .post('/', {
        name: 'Default',
        x: point.x,
        y: point.y,
        z: point.z,
      })
      .then((response) => {
        const newBauble = (
          <Bauble
            key={response.data.id}
            position={[point.x, point.y, point.z]}
            color="red"
            args={[0.2, 10, 10]}
          />
        );
        setBaubles([...baubles, newBauble]);
      });
  };

  const showBaublePreview = (point) => {
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

export default Custom;
