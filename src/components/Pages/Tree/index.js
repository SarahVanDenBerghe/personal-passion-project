import React, { useEffect, useState } from 'react';
import { Button } from '../../UI';
import { ROUTES } from '../../../consts';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { Detail, Add } from '../../Pages';
import { AddBauble, AddInfo } from '../../Content';
import { useStore } from '../../../hooks';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { CanvasWrapper } from '../../Scene';
import Bauble from '../../../models/Bauble';

const Tree = observer(() => {
  const { treeStore, baublesStore, socket } = useStore();
  const [name, setName] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();
  const { treeId, baubleId } = useParams();

  useEffect(async () => {
    await treeStore.findTreeById(treeId);
    setName(treeStore.currentTree.name);
  }, [treeId]);

  const handleClickButton = () => {
    history.push(ROUTES.tree.to + treeId + ROUTES.add.root);
  };

  return (
    <>
      <div className={styles.title__wrapper}>
        <p className={styles.count}>
          {baublesStore.baubles.length} {`wish${baublesStore.baubles.length != 1 ? 'es' : ''}`}
        </p>
        <h1 className={styles.title}>{name}</h1>
      </div>
      <div onClick={handleClickButton} className={styles.button}>
        <Button text="Add" />
      </div>

      <Switch>
        {/* 3 - Add info */}
        <Route exact path={ROUTES.tree.path + ROUTES.add.secondstep} component={AddInfo} />

        {/* 2- Add bauble */}
        <Route exact path={ROUTES.tree.path + ROUTES.add.firststep} component={AddBauble} />

        {/* 1 - Add bauble (text) */}
        <Route exact path={ROUTES.tree.path + ROUTES.add.root} component={Add} />

        {/* Detail of bauble */}
        <Route exact path={ROUTES.detail.path} component={Detail} />
      </Switch>
    </>
  );
});

export default Tree;
