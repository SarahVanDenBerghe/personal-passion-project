import React, { useEffect } from 'react';
import { Loader, Share } from '../../UI';
import { ROUTES } from '../../../consts';
import { observer } from 'mobx-react-lite';
import { Route, Switch, Link } from 'react-router-dom';
import { Detail, Add } from '../../Pages';
import { AddBauble, AddInfo } from '../../Content';
import { useStore } from '../../../hooks';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

const Tree = observer(({ showTree, setShowTree }) => {
  const { treeStore } = useStore();
  const { treeId } = useParams();
  useEffect(() => {
    treeStore.findTreeById(treeId);
  }, [treeId]);

  return (
    <>
      {!showTree && <Loader setShowTree={setShowTree} />}
      {showTree && (
        <>
          <div className={styles.buttons__wrapper}>
            <Share />
            <Link className={styles.button} to={ROUTES.tree.to + treeId + ROUTES.add.root}>
              Add a wish
            </Link>
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
      )}
    </>
  );
});

export default Tree;
