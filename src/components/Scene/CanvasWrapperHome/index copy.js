import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { Lights, CreateTree, HomeDecorations } from '..';
import { PerspectiveCamera } from 'drei';
import styles from './styles.module.scss';

// softShadows();
const CanvasWrapperHome = () => {
  return (
    <>
      <div className={styles.canvas__wrapper}>
        <Canvas className={styles.canvas} shadowMap resize={{ scroll: false }}>
          <PerspectiveCamera position={[0, 0, 11]} lookAt={[0, 0, 0]} makeDefault />
          <Lights />
          {/* <Floor /> */}

          <group>
            {/* TREES */}
            {/* <Suspense fallback={null}>
            <Model />
          </Suspense> */}
            <Suspense fallback={null}>
              <CreateTree />
            </Suspense>
            {/* <a.mesh scale={scaleTreeEmpty} castShadow position={spring.position}>
            <primitive object={treeEmpty.scene} dispose={null} />
          </a.mesh> */}
            <Suspense fallback={null}>
              <HomeDecorations />
            </Suspense>

            {/* <Sphere position={[-5, 3, -3]} args={[2, 20, 20]} castShadow>
            <meshStandardMaterial attach="material" color="pink" />
          </Sphere> */}
            {/* <Plane receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.3, 0]} args={[1000, 1000]}>
            <meshStandardMaterial attach="material" color="white" />
          </Plane> */}

            {/* <mesh receiveShadow position={[2, -5.8, 0]}>
            <primitive object={snow.scene} dispose={null} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh> */}
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default CanvasWrapperHome;
