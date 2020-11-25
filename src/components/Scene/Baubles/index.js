import React, { useContext } from 'react';
import Bauble from '../Bauble';

const Baubles = ({ view, setView, setDetail, clickTest, baubles }) => {

  return (
    <>
      {baubles.map((bauble) => {
        return (
          <>
            <Bauble
              clickTest={clickTest}
              view={view}
              setView={setView}
              setDetail={setDetail}
              key={bauble.id}
              position={[bauble.x, bauble.y, bauble.z]}
              color="red"
              args={[0.2, 10, 10]}
              bauble={bauble}
            />
          </>
        );
      })}
    </>
  );
};

export default Baubles;
