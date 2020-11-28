import React, { useContext } from 'react';
import './styles.scss';
import { Button } from '../../UI'
import { ViewContext } from '../../../contexts/ViewContext';
import { VIEWS } from '../../../consts/views'

const Add = () => {
  const [view, setView] = useContext(ViewContext);

  const handleClickButton = () => {
    if (view === VIEWS.edit) {
      setView(VIEWS.default);
    } else {
      setView(VIEWS.edit);
    }
  };

  return (
    <div onClick={handleClickButton} className="add">
      <Button text={view === 'edit' ? 'Cancel' : 'Add'} />
    </div>
  );
};

export default Add;