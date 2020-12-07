import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useParams, Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { useStore } from '../../../hooks';
import { ROUTES } from '../../../consts';
import { Share } from '../../UI';
import { observer } from 'mobx-react-lite';
import styles from './styles.module.scss';

const DetailInfo = observer(({ active, setActive }) => {
  const { baublesStore } = useStore();
  const [detail, setDetail] = useState(null);
  const history = useHistory();
  const { treeId, baubleId } = useParams();
  const { pathname } = useLocation();
  // console.log(window.location.href);

  let title,
    name,
    message,
    close,
    share = useRef(null);

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
    gsap.to([title, name, message, share], {
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
        <div>
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
        <div
          ref={(el) => {
            share = el;
          }}
        >
          <Share />
        </div>
      </div>
    </>
  );
});

export default DetailInfo;
