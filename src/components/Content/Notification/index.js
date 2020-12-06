import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { useStore } from '../../../hooks';
import styles from './styles.module.scss';

const Notification = ({ name, id }) => {
  const { treeStore } = useStore();

  return (
    <Link className={styles.notification} to={ROUTES.tree.to + treeStore.currentTree.id + ROUTES.detail.to + id}>
      {name} just added a Christmas wish!
    </Link>
  );
};

export default Notification;
