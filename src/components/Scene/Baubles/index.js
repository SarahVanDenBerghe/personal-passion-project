import React from 'react';
import { observer } from 'mobx-react-lite';
import { useBaublesStore } from '../../../hooks';
import { Bauble } from '..';

const Baubles = observer(({ navigate, pathname }) => {
  const baublesStore = useBaublesStore();

  return (
    <>
      {baublesStore.baubles.map((bauble, i) => (
        <Bauble
          key={i}
          position={[bauble.x, bauble.y, bauble.z]}
          color="red"
          args={[0.2, 10, 10]}
          bauble={bauble}
          pathname={pathname}
          navigate={navigate}
        />
      ))}
    </>
  );
});

export default Baubles;
