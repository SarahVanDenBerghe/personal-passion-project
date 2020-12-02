import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSpring, a } from 'react-spring';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../consts';
import styles from './styles.module.scss';

// https://codesandbox.io/s/usespring-react-hook-forked-k40ut?file=/src/index.js

const Sidebar = ({ children, active, setActive }) => {
  const { pathname } = useLocation();

  let sidebar,
    wrapper = useRef(null);

  useEffect(() => {
    if (pathname == ROUTES.home) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [pathname]);

  const animation = {
    // show : hide
    opacity: active ? 1 : 0,
    sidebar: {
      xPos: active ? 0 : 600,
      borderRadius: active ? 0 : '100% 0 0 50%',
    },
  };

  useEffect(() => {
    gsap.to(sidebar, {
      duration: 0.65,
      ease: 'Power2.easeIn',
      x: animation.sidebar.xPos,
      opacity: animation.opacity,
    });
  }, [active]);

  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      xys: [0, 0, 1],
      config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 },
    };
  });

  return (
    <a.div
      className={styles.sidebar__wrapper}
      ref={(el) => {
        wrapper = el;
      }}
      onMouseMove={({ clientX, clientY }) => {
        const x = clientX - (wrapper.offsetLeft - (window.scrollX || window.pageXOffset || document.body.scrollLeft));
        const y = clientY - (wrapper.offsetTop - (window.scrollY || window.pageYOffset || document.body.scrollTop));
        const dampen = 500;
        const xys = [-(y - wrapper.clientHeight / 2) / dampen, (x - wrapper.clientWidth / 2) / dampen, 1];
        setAnimatedProps({ xys: xys });
      }}
      onMouseLeave={() => {
        setAnimatedProps({ xys: [0, 0, 1] });
      }}
      style={{
        transform: animatedProps.xys.interpolate(
          (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        ),
      }}
    >
      <a.div
        className={styles.sidebar}
        ref={(el) => {
          sidebar = el;
        }}
      >
        {children}
      </a.div>
    </a.div>
  );
};

export default Sidebar;
