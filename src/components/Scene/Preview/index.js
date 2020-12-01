import React from 'react';
import { Bauble } from '..';

const Preview = ({ point, history, pathname }) => {
  return (
    <Bauble
      preview
      position={[point.x, point.y, point.z]}
      color="blue"
      args={[0.2, 10, 10]}
      history={history}
      pathname={pathname}
    />
  );
};

export default Preview;
