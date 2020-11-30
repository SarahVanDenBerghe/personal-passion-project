import React from 'react';
import { Button } from '../../UI';
import { ROUTES } from '../../../consts';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';

const Home = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickButton = () => {
    if (pathname === ROUTES.add.to) {
      navigate(ROUTES.home);
    } else {
      navigate(ROUTES.add.to);
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
