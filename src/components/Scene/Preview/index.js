import React from 'react';
import { Sphere } from 'drei';
import { Bauble } from '..';

const Preview = ({ point, history, pathname }) => {
  return (
    <Bauble
      preview
      position={[point.x, point.y, point.z]}
      bauble={{ x: point.x, y: point.y, z: point.z, style: 'color', color: 'white' }}
      args={[0.05, 10, 10]}
      history={history}
      pathname={pathname}
    />
  );
};

export default Preview;
