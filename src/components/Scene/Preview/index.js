import React from 'react';
import { Bauble } from '..';

const Preview = ({ point, history, pathname, showPreview }) => {
  return (
    <>
      <Bauble
        preview
        position={point}
        bauble={{
          x: showPreview ? point[0] : 0,
          y: showPreview ? point[1] : 0,
          z: showPreview ? point[2] : 0,
          style: 'color',
          color: 'white',
        }}
        args={[0.2, 15, 15]}
        history={history}
        pathname={pathname}
      />
    </>
  );
};

export default Preview;
