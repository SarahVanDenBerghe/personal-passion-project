import React from 'react';
import { Bauble } from '..';
import { useHistory } from 'react-router';


const Baubles = ({ setDetail, baubles, view, setView, history }) => {

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
              bauble={bauble}
              view={view}
              setView={setView}
              history={history}
            />
          </>
        );
      })}
    </>
  );
};

export default Baubles;
