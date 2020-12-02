import React, { useEffect, useState } from 'react';
import { Button } from '../../UI';
import { ROUTES } from '../../../consts';
import { Route, Switch } from 'react-router-dom';
import { Detail, Add } from '../../Pages';
import { AddBauble, AddInfo } from '../../Content';
import { useStore } from '../../../hooks';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { CanvasWrapper } from '../../Scene';

const Tree = () => {
  const { treeStore } = useStore();
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();

  /* 
  path: "/tree/:id"
  url: "/tree/15" 
  */

  useEffect(async () => {
    await treeStore.findTreeById(id);
  }, [id]);

  const handleClickButton = () => {
    history.push(ROUTES.tree.to + id + ROUTES.add.root);
  };

  return (
    <>
      <div onClick={handleClickButton} className={styles.add__button}>
        <Button text="Add" />
      </div>

      <Switch>
        {/* 3 - Add info */}
        <Route exact path={ROUTES.tree.path + ROUTES.add.secondstep} component={AddInfo} />

        {/* 2 - Add bauble */}
        <Route exact path={ROUTES.tree.path + ROUTES.add.firststep} component={AddBauble} />

        {/* 1 - Add bauble (text) */}
        <Route exact path={ROUTES.tree.path + ROUTES.add.root} component={Add} />

        {/* Detail of bauble */}
        <Route exact path={ROUTES.detail.path} component={Detail} />
      </Switch>
    </>
  );
};

export default Tree;
