import React, { useEffect } from 'react';
import './styles.scss';

const Sidebar = ({ detail }) => {
  useEffect(() => {
    console.log(detail);
  },[detail])

  return (
    <div className="sidebar">
      <p className="title">Christmas wish of</p>
      <p className="name">Name</p>
      <p className="message">
        {detail} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Maecenas viverra ut turpis vitae blandit. Donec varius sed nibh vel
        posuere. Vestibulum dictum posuere lorem at dapibus. Aliquam malesuada
        ipsum et viverra congue. Class aptent taciti sociosqu ad litora torquent
        per.
      </p>
    </div>
  );
};

export default Sidebar;
