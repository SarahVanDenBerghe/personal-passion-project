import React from 'react';
import { Bauble } from '..';

const Baubles = ({ baubles, history, pathname }) => {
  return (
    <>
      {baubles.map(bauble => (
          <Bauble
            key={bauble.id}
            position={[bauble.x, bauble.y, bauble.z]}
            color="red"
            args={[0.2, 10, 10]}
            bauble={bauble}
            pathname={pathname}
            history={history}
          />
        ))
      }
    </>
  );
};

export default Baubles;
