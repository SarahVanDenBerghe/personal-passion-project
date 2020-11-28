import React, { useEffect, useRef, useContext } from 'react';
import { VIEWS } from '../../../consts/views';
import './styles.scss';
import { gsap } from 'gsap';
import { useSpring, a } from 'react-spring';
import { ViewContext } from '../../../contexts/ViewContext';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 280,
  (x - window.innerWidth / 2) / 280,
  1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Sidebar = ({ detail, setDetail }) => {
  const { id } = useParams();
  console.log(id);

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 40, tension: 400, friction: 300 },
  }));

  const [view, setView] = useContext(ViewContext);
  let sidebar,
    title,
    name,
    message,
    close = useRef(null);
  let active = view === VIEWS.detail;
  const history = useHistory();

  const animation = {
    // show : hide
    opacity: active ? 1 : 0,
    sidebar: {
      xPos: active ? 0 : 600,
      borderRadius: active ? 0 : '100% 0 0 50%',
    },
    text: {
      yPos: active ? 0 : 150,
      delay: active ? 0.35 : 0.1,
      stagger: active ? 0.1 : -0.1,
    },
    close: {
      scale: active ? 1 : 0,
      delay: active ? 0.3 : 0,
    },
  };

  useEffect(() => {
    active = view === VIEWS.detail;

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

    gsap.to(close, {
      duration: 0.4,
      ease: 'Power2.easeIn',
      // opacity: animation.opacity,
      scaleX: animation.close.scale,
      scaleY: animation.close.scale,
      delay: animation.close.delay,
    });
  }, [view]);

  const handleClickClose = () => {
    setView(VIEWS.default);
    history.push(`/`);
    // setDetail(null);
  };

  return (
    <a.div
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      className="sidebar"
      style={
        view === VIEWS.detail ? { transform: props.xys.interpolate(trans) } : {}
      }
      ref={(el) => {
        sidebar = el;
      }}
    >
      <button
        onClick={(e) => handleClickClose()}
        className="close"
        ref={(el) => {
          close = el;
        }}
      />
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
    </a.div>
  );
};

export default Sidebar;
