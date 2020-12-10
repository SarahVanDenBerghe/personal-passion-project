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
    share,
    circle,
    line = useRef(null);

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
    line: {
      height: active ? '9rem' : '0',
      delay: active ? 0 : 0,
    },
    circle: {
      scale: active ? 1 : 0,
      delay: active ? 0.4 : 0,
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

    gsap.to(line, {
      duration: 0.4,
      ease: 'Power2.easeIn',
      height: animation.line.height,
      delay: animation.line.delay,
    });

    gsap.to(circle, {
      delay: animation.circle.delay,
      duration: 0.4,
      ease: 'Power2.easeIn',
      scale: animation.circle.scale,
    });
  }, [active]);

  const handleClickClose = () => {
    setActive(false);
    history.push(ROUTES.tree.to + treeId);
  };

  const getBackground = () => {
    if (detail.style === 'image') {
      console.log(process.env.REACT_APP_STRAPI_API + detail.image.url);
      return `center / cover no-repeat url(${process.env.REACT_APP_STRAPI_API}${detail.image.url})`;
    } else {
      switch (detail.color) {
        case 'red':
          return `${styles.red}`;
        case 'blue':
          return `${styles.blue}`;
        case 'green':
          return `${styles.green}`;
        default:
          return '#ffffff;';
      }
    }
  };

  return (
    <div className={styles.detail}>
      <button
        onClick={() => handleClickClose()}
        className={styles.detail__close}
        ref={(el) => {
          close = el;
        }}
      />

      <div className={styles.detail__bauble}>
        <span
          className={styles.bauble__line}
          ref={(el) => {
            line = el;
          }}
        />
        <div
          className={styles.bauble__circle}
          ref={(el) => {
            circle = el;
          }}
          style={{
            background: detail && getBackground(),
          }}
        />
      </div>

      <div className={styles.detail__text}>
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
    </div>
  );
});

export default DetailInfo;
