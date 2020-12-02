import React, { useState, Suspense, useContext, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Lights, Tree, Floor, Baubles, Model } from '..';
import { useHistory, useLocation } from 'react-router';
import { ROUTES } from '../../../consts';
import { useGLTFLoader } from 'drei';
import { useGLTF } from '@react-three/drei';
import { useSpring, a } from 'react-spring/three';
import styles from './styles.module.scss';

softShadows();
const HomeTrees = () => {
  const canvas = useRef(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const gltf = useGLTFLoader('/treetexture.gltf', true);
  const { nodes, materials } = useGLTF('/treetexture.gltf');
  const mesh = useRef();

  return (
    <>
      <Canvas
        className={styles.canvas}
        colorManagement
        shadowMap
        resize={{ scroll: false }}
        camera={{ position: [0, 0, 8] }}
      >
        <Lights />
        <Floor />

        <Model />

        <group>
          {/* <mesh useRef={mesh} position={[0, -5, 0]}>
            <primitive object={gltf.scene} dispose={null} />
          </mesh> */}
          {/* <mesh position={[-3, -5, -3]}>
            <primitive object={gltf.scene} dispose={null} />
          </mesh>
          <mesh position={[3, -5, -3]}>
            <primitive object={gltf.scene} dispose={null} />
          </mesh> */}
        </group>
      </Canvas>
    </>
  );
};

export default HomeTrees;
