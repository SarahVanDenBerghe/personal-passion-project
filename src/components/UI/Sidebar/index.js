import React, { useEffect, useRef } from 'react';
import './styles.scss';
import { gsap } from 'gsap';

const Sidebar = ({ detail, setDetail }) => {
  const sidebar = useRef();

  // useEffect(() => {
  //   gsap.to(sidebar.current, {
  //     backgroundColor: 'green',
  //     duration: 1,
  //     ease: 'none',
  //   });
  // }, [detail]);

  return (
    <div className="sidebar" ref={sidebar}>
      {detail && (
        <>
          <p onClick={(e) => setDetail(null)} className="close">
            Close
          </p>
          <p className="title">Christmas wish of</p>
          <p className="name">Name</p>
          <p className="message">
            {detail.id} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Maecenas viverra ut turpis vitae blandit. Donec varius sed nibh vel
            posuere. Vestibulum dictum posuere lorem at dapibus. Aliquam
            malesuada ipsum et viverra congue. Class aptent taciti sociosqu ad
            litora torquent per.
          </p>
        </>
      )}
    </div>
  );
};

export default Sidebar;
