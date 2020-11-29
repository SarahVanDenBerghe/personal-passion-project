import React, { useState } from 'react';
import { Sidebar } from '../../UI';
import { AddForm } from '../../Content';
import './styles.scss';

const Add = () => {
  const [active, setActive] = useState(false);

  // Drag animation!
  return (
    <div className="add">
      {/* STEP ONE */}
      <div className="add__text">
        <p className="add__title">Place bauble</p>
        <p className="add__tagline">Drag to rotate</p>
      </div>
      {/* STEP TWO */}
      <Sidebar active={active} setActive={setActive}>
        <AddForm active={active} setActive={setActive} />
      </Sidebar>
      ;
    </div>
  );
};

export default Add;
