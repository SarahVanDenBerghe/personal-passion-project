import React, { useState, useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { gsap } from 'gsap';
import { ROUTES } from '../../../consts';
import { OrbitControls } from 'drei';

const CameraControls = ({ canvas, pathname, baubles }) => {
  const { gl, camera } = useThree();
  const [zoom, setZoom] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const controls = useRef(null);
  const page = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const bauble = baubles.find((bauble) => bauble.id == id);

  let currDistance = 0;
  let factor = 0;

  // Animating tree on detail view
  useEffect(() => {
    const zoomDistance = `/${page}/` == ROUTES.detail.to ? 8 : 4;
    setZoom(zoomDistance);

    currDistance = camera.position.length();
    factor = zoom / currDistance;

    // End position of tree, zoomed
    let x = camera.position.x * factor;
    let y = camera.position.y * factor;
    let z = camera.position.z * factor;
    if (bauble) {
      x = bauble.x * 2;
      y = bauble.y;
      z = bauble.z * 2;
    }

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
  }, [pathname]);

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
        target={[0, 0, 0]}
        args={[camera, gl.domElement]}
        ref={controls}
      />
    </>
  );
};

export default CameraControls;
