import React, { useState, useLayoutEffect } from 'react';
import SidebarDesktop from './Desktop';
import SidebarMobile from './Mobile';
import styles from './styles.module.scss';

const useWindowSize = () => {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const Sidebar = ({ children, active, setActive }) => {
  const width = useWindowSize();

  return (
    <>
      {width > 768 ? (
        <SidebarDesktop active={active} setActive={setActive}>
          {children}
        </SidebarDesktop>
      ) : (
        <SidebarDesktop active={active} setActive={setActive}>
          {children}
        </SidebarDesktop>
      )}
    </>
  );
};

export default Sidebar;
