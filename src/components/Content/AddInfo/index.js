import React, { useState } from 'react';
import { AddForm } from '..';
import { Sidebar } from '../../UI';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { useBaublesStore } from '../../../hooks';

const AddInfo = () => {
  const baublesStore = useBaublesStore();
  const [active, setActive] = useState(false);
  const [redirect, setRedirect] = useState(true);
  const bauble = baublesStore.baubleFromUser;

  return (
    <>
      {!bauble && redirect ? (
        <Redirect from={ROUTES.add.to + '/' + ROUTES.add.secondstep} to={ROUTES.add.to} />
      ) : (
        <Sidebar active={active} setActive={setActive}>
          <AddForm setRedirect={setRedirect} active={active} setActive={setActive} />
        </Sidebar>
      )}
    </>
  );
};

export default AddInfo;
