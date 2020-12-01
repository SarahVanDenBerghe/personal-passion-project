import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TransitionGroup, Transition } from 'react-transition-group';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../consts';
import { gsap } from 'gsap';
import './styles.scss';

const Add = () => {
  let title,
    tagline = useRef(null);
  const [active, setActive] = useState(false);
  const history = useHistory();

  const animation = {
    // show : hide
    opacity: active ? 1 : 0,
    text: {
      yPos: active ? 0 : 150,
      delay: active ? 0.5 : 0.1,
      stagger: active ? 0.1 : -0.1,
      duration: active ? 0.6 : 0.6,
    },
    icon: {},
  };

  useEffect(() => {
    gsap.to([title, tagline], {
      duration: animation.text.duration,
      y: animation.text.yPos,
      opacity: animation.opacity,
      delay: animation.text.delay,
      stagger: {
        ease: 'Power2.easeIn',
        amount: animation.text.stagger,
      },
    });
  }, [active]);

  useEffect(() => {
    setActive(true);
  }, []);

  const handleClickNext = () => {
    setActive(false);
    history.push(`${ROUTES.add.to}/${ROUTES.add.firststep}`);
  };

  return (
    <div className="add" onClick={(e) => handleClickNext()}>
      {/* INFO - laten animeren dan routen naar step/one waarbij user kerstbal kan plaatsen*/}
      <motion.div className="add__text">
        <p
          ref={(el) => {
            title = el;
          }}
          className="add__title"
        >
          Place bauble
        </p>
        <p
          ref={(el) => {
            tagline = el;
          }}
          className="add__tagline"
        >
          Drag to rotate
        </p>

        <motion.img
          initial={{ x: -250 }}
          animate={{
            x: 250,
          }}
          transition={{ ease: 'easeIn', duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="add_icon"
          alt="hand icon"
          src="/assets/icons/hand.svg"
        />
      </motion.div>
    </div>
  );
};

export default Add;
