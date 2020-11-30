import React from 'react';
import './styles.scss';
import { motion } from 'framer-motion';

const AddInfo = () => {
  return (
    <div className="add">
      {/* INFO - laten animeren dan routen naar step/one waarbij user kerstbal kan plaatsen*/}
      <div className="add__text">
        <p className="add__title">Place bauble</p>
        <p className="add__tagline">Drag to rotate</p>
        <motion.img
          initial={{ x: -80 }}
          animate={{
            x: 400,
          }}
          transition={{ ease: 'easeIn', duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="add_icon"
          alt="hand icon"
          src="/assets/icons/hand.svg"
        />

        <svg>
          <motion.circle cx={500} animate={{ cx: [null, 100] }} initial={false} />
        </svg>
      </div>
    </div>
  );
};

export default AddInfo;
