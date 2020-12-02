import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../hooks';
import { Bauble } from '..';

const Baubles = observer(({ history, pathname }) => {
  const { baublesStore } = useStore();

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
          history={history}
        />
      ))}
    </>
  );
});

export default Baubles;
