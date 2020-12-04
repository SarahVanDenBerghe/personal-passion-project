import React, { useState } from 'react';
import { AddForm } from '..';
import { Sidebar } from '../../UI';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { useStore } from '../../../hooks';
import { useParams } from 'react-router-dom';

const AddInfo = () => {
  const { baublesStore } = useStore();
  const [active, setActive] = useState(false);
  const [redirect, setRedirect] = useState(true);
  const { treeId } = useParams();
  const bauble = baublesStore.baubleFromUser;

  return (
    <>
      {!bauble && redirect ? (
        <Redirect from={ROUTES.tree.path + ROUTES.add.secondstep} to={ROUTES.tree.to + treeId + ROUTES.add.root} />
      ) : (
        <Sidebar active={active} setActive={setActive}>
          <AddForm setRedirect={setRedirect} active={active} setActive={setActive} />
        </Sidebar>
      )}
    </>
  );
};

export default AddInfo;
