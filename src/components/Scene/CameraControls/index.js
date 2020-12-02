import React, { useState, useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { gsap } from 'gsap';
import { ROUTES } from '../../../consts';
import { OrbitControls } from 'drei';
import { useStore } from '../../../hooks';

const CameraControls = ({ canvas, pathname, setGroupPos }) => {
  const { baublesStore } = useStore();
  const { gl, camera } = useThree();
  const [zoom, setZoom] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [target, setTarget] = useState([0, 0, 0]);
  const controls = useRef(null);
  const page = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const bauble = baublesStore.baubles.find((bauble) => bauble.id == id);

  let currDistance = 0;
  let factor = 0;

  const animation = {
    canvas: {
      xPos: zoomIn ? -150 : 0,
    },
    group: {
      yPos: zoomIn ? -3 : 0,
    },
  };

  // Set zoomIn of tree on each route change
  useEffect(() => {
    const checkZoom = `/${page}/` == ROUTES.detail.to;
    setZoomIn(checkZoom);
  }, [pathname]);

  useEffect(() => {
    const zoomDistance = zoomIn ? 8 : 4;
    setZoom(zoomDistance);

    currDistance = camera.position.length();
    factor = zoom / currDistance;

    // End position of tree, zoomed
    let x = camera.position.x * factor;
    let y = camera.position.y * factor;
    let z = camera.position.z * factor;

    if (bauble) {
      // Set X and Z coördinates of camera to bauble coördinates
      x = bauble.x * 2;
      y = bauble.y; // Avoid changing because of orbit controls
      z = bauble.z * 2;

      // Set Y coördinate of whole scene
      setGroupPos([0, -bauble.y, 0]);
      // setTarget([bauble.x, bauble.y, bauble.z]);
    } else {
      // Reset Y coördinate
      setGroupPos([0, 0, 0]);
      // setTarget([0, 0, 0]);
    }

    // Only set camera position once the tree loading in animtion is done
    if (hasLoaded) {
      gsap.fromTo(
        camera.position,
        {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        },
        {
          duration: 0.7,
          ease: 'Power2.easeOut',
          x: x,
          y: y,
          z: z,
          onComplete: () => controls.current.update(),
        }
      );
    }

    gsap.to(canvas.current, {
      duration: 0.55,
      ease: 'Power2.easeIn',
      x: animation.canvas.xPos,
    });
  }, [zoomIn]);

  // Animating tree from start
  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 300;

    gsap.to(camera.position, {
      duration: 2,
      ease: 'Power2.easeOut',
      z: 8,
      onComplete: () => {
        controls.current.update();
        setHasLoaded(true);
      },
    });
  }, []);

  //codesandbox.io/s/r3f-basic-demo-f8zii?file=/src/index.js:492-612

  return (
    <>
      <OrbitControls
        enableKeys={false}
        enablePan={false}
        enableZoom={false}
        enableDamping={false}
        target={target}
        args={[camera, gl.domElement]}
        ref={controls}
      />
    </>
  );
};

export default CameraControls;
