import React from 'react';
import { Bauble } from '..';

const Preview = ({ point, history, pathname, showPreview }) => {
  return (
    <>
      {showPreview && (
        <Bauble
          preview
          position={point}
          bauble={{ x: point[0], y: point[1], z: point[2], style: 'color', color: 'white' }}
          args={[0.12, 15, 15]}
          history={history}
          pathname={pathname}
        />
      )}
    </>
  );
};

export default Preview;
