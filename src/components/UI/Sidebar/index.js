import React from 'react';
import './styles.scss';

const Sidebar = () => (
  <div
    role="button"
    className="modal-wrapper"
    onClick={() => this.props.history.goBack()}
  >
    <div role="button" className="modal" onClick={(e) => e.stopPropagation()}>
      <p>CONTENT</p>
    </div>
  </div>
);

export default Sidebar;
