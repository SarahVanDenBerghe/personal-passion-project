import React, { useEffect, useRef, useContext } from 'react';
import { VIEWS } from '../../../consts/views';
import './styles.scss';
import { gsap } from 'gsap';
import { ViewContext } from '../../../contexts/ViewContext';

const Sidebar = ({ detail, setDetail }) => {
  const [view, setView] = useContext(ViewContext);
  let sidebar = useRef(null);
  let title = useRef(null);
  let name = useRef(null);
  let message = useRef(null);
  let active = view == VIEWS.detail;

  const animation = {
    // show : hide
    opacity: active ? 1 : 0,
    sidebar: {
      xPos: active ? 0 : 600,
      borderRadius: active ? 0 : "100% 0 0 50%"
    },
    text: {
      yPos: active ? 0 : 150,
      delay: active ? 0.35 : 0.1,
      stagger: active ? 0.1 : -0.1
    }
  };

  useEffect(() => {
    active = view == VIEWS.detail;

    gsap.to(sidebar, {
      duration: 0.55,
      ease: 'Power2.easeIn',
      x: animation.sidebar.xPos,
      opacity: animation.opacity,
      // borderRadius: animation.sidebar.borderRadius
    });

    gsap.to([title, name, message], {
      duration: 0.6,
      y: animation.text.yPos,
      opacity: animation.opacity,
      delay: animation.text.delay,
      stagger: {
        ease: 'Power2.easeIn',
        amount: animation.text.stagger,
      },
    });
  }, [view]);

  const handleClickClose = () => {
    setView(VIEWS.default);
    // setDetail(null); 
  }

  return (
    <div
      className="sidebar"
      ref={(el) => {
        sidebar = el;
      }}
    >
      <button onClick={(e) => handleClickClose()} className="close">
        <span />
        <span />
      </button>
      <p
        className="title"
        ref={(el) => {
          title = el;
        }}
      >
        Christmas wish of
      </p>
      <p
        className="name"
        ref={(el) => {
          name = el;
        }}
      >
        Name
      </p>
      <p
        className="message"
        ref={(el) => {
          message = el;
        }}
      >
        {detail && (
          <>
            {detail.id} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Maecenas viverra ut turpis vitae blandit. Donec varius sed nibh vel
            posuere. Vestibulum dictum posuere lorem at dapibus. Aliquam
            malesuada ipsum et viverra congue. Class aptent taciti sociosqu ad
            litora torquent per.
          </>
        )}
      </p>
    </div>
  );
};

export default Sidebar;
