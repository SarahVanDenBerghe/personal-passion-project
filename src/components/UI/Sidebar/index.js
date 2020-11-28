import React, { useEffect, useRef, useContext, useState } from 'react';
import './styles.scss';
import { gsap } from 'gsap';
import { useSpring, a } from 'react-spring';
import { useHistory, useParams } from 'react-router';
import { BaublesContext } from '../../../contexts/BaublesContext';

// https://codesandbox.io/s/usespring-react-hook-forked-k40ut?file=/src/index.js

const Sidebar = () => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [active, setActive] = useState(true);
  const { id } = useParams();
  const detail = baubles.find((bauble) => bauble.id == id);
  const history = useHistory();

  useEffect(() => {
    if (!active) {
      setActive(true);
    }
  }, [id]);

  let sidebar, title, name, message, wrapper, close = useRef(null);

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
    gsap.to(sidebar, {
      duration: 0.65,
      ease: 'Power2.easeIn',
      x: animation.sidebar.xPos,
      opacity: animation.opacity,
      onComplete: () => {
        if (!active) {
          history.push(`/`);
        }
      },
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
      opacity: animation.opacity,
      scaleX: animation.close.scale,
      scaleY: animation.close.scale,
      delay: animation.close.delay,
    });
  }, [active]);

  const handleClickClose = () => {
    setActive(false);
  };

  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      xys: [0, 0, 1],
      config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 },
    };
  });

  return (
    <a.div
      className="sidebar__wrapper"
      ref={(el) => {
        wrapper = el;
      }}
      onMouseMove={({ clientX, clientY }) => {
        const x =
          clientX -
          (wrapper.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft));
        const y =
          clientY -
          (wrapper.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop));
        const dampen = 500;
        const xys = [
          -(y - wrapper.clientHeight / 2) / dampen,
          (x - wrapper.clientWidth / 2) / dampen,
          1,
        ];
        setAnimatedProps({ xys: xys });
      }}
      onMouseLeave={() => {
        setAnimatedProps({ xys: [0, 0, 1] });
      }}
      style={{
        transform: animatedProps.xys.interpolate(
          (x, y, s) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        ),
      }}
    >
      <a.div
        className="sidebar"
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
              {detail.id} Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Maecenas viverra ut turpis vitae blandit. Donec varius sed
              nibh vel posuere. Vestibulum dictum posuere lorem at dapibus.
              Aliquam malesuada ipsum et viverra congue. Class aptent taciti
              sociosqu ad litora torquent per.
            </>
          )}
        </p>
      </a.div>
    </a.div>
  );
};

export default Sidebar;
