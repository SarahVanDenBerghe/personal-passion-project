import React, { useEffect } from 'react';
import { useGLTFLoader } from 'drei';
import { useSpring, a, config } from 'react-spring/three';

const HomeDecorations = ({ showDecoration }) => {
  const treeDecorated_1 = useGLTFLoader('/scene/tree_decorated_1.glb', true);
  const treeDecorated_2 = useGLTFLoader('/scene/tree_decorated_2.glb', true);
  const treeDecorated_3 = useGLTFLoader('/scene/tree_decorated_3.glb', true);
  const giftRed = useGLTFLoader('/scene/gift_1.glb', true);
  const giftGreen = useGLTFLoader('/scene/gift_2.glb', true);
  const giftBlue = useGLTFLoader('/scene/gift_3.glb', true);

  const [{ scaleTreeDec1, scaleTreeDec2, scaleTreeDec3, scaleGiftRed, scaleGiftBlue, scaleGiftGreen }, set] = useSpring(
    () => ({
      scaleTreeDec1: [0, 0, 0],
      scaleTreeDec2: [0, 0, 0],
      scaleTreeDec3: [0, 0, 0],
      scaleGiftRed: [0, 0, 0],
      scaleGiftBlue: [0, 0, 0],
      scaleGiftGreen: [0, 0, 0],
      config: config.wobbly,
    })
  );

  useEffect(() => {
    if (!showDecoration) {
      set({
        scaleTreeDec1: [0, 0, 0],
        scaleTreeDec2: [0, 0, 0],
        scaleTreeDec3: [0, 0, 0],
        scaleGiftRed: [0, 0, 0],
        scaleGiftBlue: [0, 0, 0],
        scaleGiftGreen: [0, 0, 0],
        config: config.default,
      });
    } else {
      setTimeout(() => {
        set({ scaleTreeEmpty: [1, 1, 1] });
      }, 380);

      setTimeout(() => {
        set({ scaleTreeDec1: [1, 1, 1] });
      }, 0);

      setTimeout(() => {
        set({ scaleTreeDec2: [1, 1, 1], scaleGiftBlue: [1, 1, 1] });
      }, 150);

      setTimeout(() => {
        set({ scaleTreeDec3: [1, 1, 1], scaleGiftRed: [1, 1, 1] });
      }, 280);

      setTimeout(() => {
        set({ scaleGiftGreen: [1, 1, 1] });
      }, 420);
    }
  }, [showDecoration, set]);

  return (
    <>
      <a.mesh scale={scaleTreeDec1} castShadow position={[3, -5.5, -3.5]}>
        <primitive object={treeDecorated_1.scene} dispose={null} />
      </a.mesh>
      <a.mesh scale={scaleTreeDec2} castShadow position={[8.5, -5.5, -1]}>
        <primitive object={treeDecorated_2.scene} dispose={null} />
      </a.mesh>
      <a.mesh scale={scaleTreeDec3} castShadow position={[8.3, -5.5, -5]}>
        <primitive object={treeDecorated_3.scene} dispose={null} />
      </a.mesh>
      <a.mesh scale={scaleGiftRed} castShadow position={[-0.8, -5, -1.85]}>
        <primitive object={giftRed.scene} dispose={null} />
      </a.mesh>
      <a.mesh scale={scaleGiftGreen} castShadow position={[0.9, -5, -2.2]} rotation={[0, 0.75, 0]}>
        <primitive object={giftGreen.scene} dispose={null} />
      </a.mesh>
      <a.mesh scale={scaleGiftBlue} castShadow position={[-0.6, -5, -3.5]}>
        <primitive object={giftBlue.scene} dispose={null} />
      </a.mesh>
    </>
  );
};

export default HomeDecorations;
