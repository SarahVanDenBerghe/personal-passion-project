import React, { useState } from 'react';
import { AddForm } from '..';
import { Sidebar } from '../../UI';

const AddInfo = () => {
  const [active, setActive] = useState(false);
  console.log('test');
  console.log(active);

  return (
    <>
      <p>Hallooo</p>
      <Sidebar active={active} setActive={setActive}>
        <AddForm active={active} setActive={setActive} />
      </Sidebar>
    </>
  );
};

export default AddInfo;
