import React from 'react';
import { Button } from '../../UI';
import { ROUTES } from '../../../consts';
import { useLocation, useHistory } from 'react-router-dom';
import './styles.scss';

const Tree = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClickButton = () => {
    if (pathname === ROUTES.add.to) {
      history.push(ROUTES.home);
    } else {
      history.push(ROUTES.add.to);
    }
  };

  return (
    <>
      <div onClick={handleClickButton} className="add__button">
        <Button text="Add" />
      </div>
    </>
  );
};

export default Tree;
