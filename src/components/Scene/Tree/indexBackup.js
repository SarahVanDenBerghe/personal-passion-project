import React, { useContext, useEffect, useRef } from 'react';
import { Bauble } from '..';
import axios from 'axios';
import { useFrame } from 'react-three-fiber';
import { MeshWobbleMaterial, useGLTFLoader } from 'drei';
import { VIEWS } from '../../../consts/views';
import { gsap } from 'gsap';
import { useSpring, a } from 'react-spring/three';

const Tree = ({ setBaublePreview, view, setView, baubles, setBaubles }) => {
  const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);
  const mesh = useRef();
  const meshTest = useRef();

  useFrame(() => (meshTest.current.rotation.x = meshTest.current.rotation.y += 0.05));

  useEffect(() => {
    // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    // console.log(mesh);
  }, [mesh]);

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

  // useEffect(() => {
  //   gsap.to(tree.current, {
  //     duration: 0.8,
  //     ease: 'Power2.easeIn',
  //     opacity: 0,
  //     scale: 0,
  //     transformOrigin: '50% 50%',
  //   });
  // });

  // console.log(tree);

  // useFrame(() => {
  //   tree.current.rotation.y += 0.01;
  // });

  return (
    <>
      <a.mesh position={[0, 5, 0]} ref={meshTest}>
        <boxBufferGeometry attach="geometry" />
        <MeshWobbleMaterial color="lightblue" attach="material" />
      </a.mesh>

      <a.mesh
        useRef={mesh}
        position={[0, -5, 0]}
        onPointerDown={(e) => addBauble(e.point)}
        onPointerMove={(e) => showBaublePreview(e.point)}
      >
        <primitive object={gltf.scene} dispose={null} />
      </a.mesh>
    </>
  );
};

export default Tree;
