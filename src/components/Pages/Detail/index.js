import React, { useState } from 'react';
import { Sidebar } from '../../UI';
import { DetailInfo } from '../../Content';
import './styles.scss';

const Detail = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      {/* <Sidebar view="detail" /> */}
      <Sidebar active={active} setActive={setActive}>
        <DetailInfo active={active} setActive={setActive} />
      </Sidebar>
    </>
  );
};

export default Detail;
