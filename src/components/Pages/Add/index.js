import React from 'react';
import { ROUTES } from '../../../consts';
import { Route } from 'react-router-dom';
import { AddBauble, AddIntro, AddInfo } from '../../Content';

const Add = ({ match }) => {
  return (
    <>
      <Route exact path={match.url} component={AddIntro} />
      <Route path={match.url + '/' + ROUTES.add.firststep} component={AddBauble} />
      <Route path={match.url + '/' + ROUTES.add.secondstep} component={AddInfo} />
    </>
  );
};
export default Add;
