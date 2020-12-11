import React, { useState, useEffect } from 'react';
import { useGLTFLoader } from 'drei';
import { useSpring, a, config } from 'react-spring/three';

const CreateTree = ({ showDecoration }) => {
  const [positionTree, setPositionTree] = useState([3.5, -5, 1.2]);
  const [rotationTree, setRotationTree] = useState([0, 0, 0]);
  const [positionStar, setPositionStar] = useState([3.5, 5, -1]);
  const treeEmpty = useGLTFLoader('/scene/tree_empty.glb', true);
  const star = useGLTFLoader('/scene/star.glb', true);

  const [{ scaleTreeEmpty, scaleStar }, set] = useSpring(() => ({
    scaleTreeEmpty: [0, 0, 0],
    scaleStar: [1, 1, 1],
    config: config.wobbly,
  }));

  set({ scaleTreeEmpty: [1, 1, 1] });

  // useEffect(() => {
  //   set({
  //     scaleTreeEmpty: [0, 0, 0],
  //     scaleStar: [0, 0, 0],
  //     config: config.default,
  //   });
  // });

  useEffect(() => {
    if (!showDecoration) {
      // Only tree and star
      setPositionTree([3.5, -5, -1]);
      setRotationTree([0, 3, 0]);
      setTimeout(() => {
        setPositionStar([3.5, -5, -1]);
      }, 100);
    } else {
      // Tree & Decorationss, no star
      setPositionTree([3.5, -5, 1.2]);
      setRotationTree([0, 0, 0]);
      setPositionStar([4, 2, -1]);
    }
  }, [showDecoration]);

  const spring = useSpring({ positionTree: positionTree, rotationTree: rotationTree, positionStar: positionStar });

  return (
    <>
      <a.mesh scale={scaleTreeEmpty} castShadow position={spring.positionTree} rotation={spring.rotationTree}>
        <primitive object={treeEmpty.scene} dispose={null} />
      </a.mesh>
      <a.mesh scale={scaleStar} castShadow position={spring.positionStar} rotation={[0, 3, 0]}>
        <primitive object={star.scene} dispose={null} />
      </a.mesh>
    </>
  );
};

export default CreateTree;
