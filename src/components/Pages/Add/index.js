import React from 'react';
import { ROUTES } from '../../../consts';
import { Route, Redirect } from 'react-router-dom';
import { AddBauble, AddIntro, AddInfo } from '../../Content';
import { useBaublesStore } from '../../../hooks';

const Add = ({ match }) => {
  const baublesStore = useBaublesStore();
  const bauble = baublesStore.baubleFromUser;
  console.log(bauble);

  return (
    <>
      <Route exact path={match.url} component={AddIntro} />
      <Route exact path={match.url + '/' + ROUTES.add.firststep} component={AddBauble} />

      {/* Redirect to start if bauble is not known yet*/}
      <Route exact path={match.url + '/' + ROUTES.add.secondstep}>
        {bauble ? <AddInfo /> : <Redirect to={match.url} />}
      </Route>
    </>
  );
};
export default Add;
