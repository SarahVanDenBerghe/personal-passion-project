import React, { useContext } from 'react';
import Bauble from '../Bauble';
import { BaublesContext } from '../../../contexts/BaublesContext';

const Baubles = ({ setDetail }) => {
  const [baubles] = useContext(BaublesContext);
  
  return (
    <>
      {baubles.map((bauble) => {
        return (
          <>
            <Bauble
              setDetail={setDetail}
              key={bauble.id}
              position={[bauble.x, bauble.y, bauble.z]}
              color="red"
              args={[0.2, 10, 10]}
              id={bauble.id}
            />
          </>
        );
      })}
    </>
  );
};

export default Baubles;
