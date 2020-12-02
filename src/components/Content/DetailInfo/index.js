import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useStore } from '../../../hooks';
import { ROUTES } from '../../../consts';
import { observer } from 'mobx-react-lite';
import styles from './styles.module.scss';

const DetailInfo = observer(({ active, setActive }) => {
  const { baublesStore } = useStore();
  const [detail, setDetail] = useState(null);
  const history = useHistory();
  const { treeId, baubleId } = useParams();

  let title,
    name,
    message,
    close = useRef(null);

  useEffect(() => {
    setActive(true);
  }, []);

  useEffect(() => {
    const info = baublesStore.getBaubleById(parseInt(baubleId));
    setDetail(info);
  }, [baubleId]);

  const animation = {
    // show : hide
    opacity: active ? 1 : 0,
    text: {
      yPos: active ? 0 : 150,
      delay: active ? 0.35 : 0.1,
      stagger: active ? 0.1 : -0.1,
      duration: active ? 0.6 : 0.6,
    },
    close: {
      scale: active ? 1 : 0,
      delay: active ? 0.3 : 0,
    },
  };

  useEffect(() => {
    gsap.to([title, name, message], {
      duration: animation.text.duration,
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
    history.push(ROUTES.tree.to + treeId);
  };

  return (
    <>
      <button
        onClick={(e) => handleClickClose()}
        className={styles.close}
        ref={(el) => {
          close = el;
        }}
      />
      <div className={styles.detail}>
        <p
          className={styles.detail__title}
          ref={(el) => {
            title = el;
          }}
        >
          Christmas wish of
        </p>
        <p
          className={styles.detail__name}
          ref={(el) => {
            name = el;
          }}
        >
          {detail && <>{detail.name}</>}
        </p>
        <p
          className={styles.detail__message}
          ref={(el) => {
            message = el;
          }}
        >
          {detail && <>{detail.text}</>}
        </p>
      </div>
    </>
  );
});

export default DetailInfo;
