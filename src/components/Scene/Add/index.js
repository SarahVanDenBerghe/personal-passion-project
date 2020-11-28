import React, { useContext } from 'react';
import './styles.scss';
import { Button } from '../../UI'
import { ROUTES } from '../../../consts';
import { useHistory, useLocation } from 'react-router';

const Add = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClickButton = () => {
    if (pathname === ROUTES.add) {
      history.push(ROUTES.home);
    } else {
      history.push(ROUTES.add);
    }
  };

  return (
    <div onClick={handleClickButton} className="add">
      <Button text="Add" />
    </div>
  );
};

export default Add;