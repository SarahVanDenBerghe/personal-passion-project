import React from 'react';
import { Button } from '../../UI';
import { ROUTES } from '../../../consts';
import { useHistory, useLocation } from 'react-router';
import './styles.scss';

const Home = () => {
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
    <>
      <div onClick={handleClickButton} className="add__button">
        <Button text="Add" />
      </div>
    </>
  );
};

export default Home;
