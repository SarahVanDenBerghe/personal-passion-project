import React, { useEffect, useRef, useContext, useState } from 'react';
import { gsap } from 'gsap';
import { useHistory, useParams } from 'react-router';
import { BaublesContext } from '../../../contexts/BaublesContext';
import { ROUTES } from '../../../consts';
import './styles.scss';

const DetailInfo = ({ active, setActive }) => {
  const [baubles, setBaubles, loading] = useContext(BaublesContext);
  const [detail, setDetail] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  let title,
    name,
    message,
    close = useRef(null);

  useEffect(() => {
    setActive(true);
  }, []);

  useEffect(() => {
    const info = baubles.find((bauble) => bauble.id == id);
    setDetail(info);
  }, [id]);

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
    history.push(ROUTES.home);
  };

  return (
    <>
      <button
        onClick={(e) => handleClickClose()}
        className="close"
        ref={(el) => {
          close = el;
        }}
      />
      <div className="detail">
        <p
          className="detail__title"
          ref={(el) => {
            title = el;
          }}
        >
          Christmas wish of
        </p>
        <p
          className="detail__name"
          ref={(el) => {
            name = el;
          }}
        >
          Name
        </p>
        <p
          className="detail__message"
          ref={(el) => {
            message = el;
          }}
        >
          {detail && (
            <>
              {detail.id} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra ut turpis vitae
              blandit. Donec varius sed nibh vel posuere. Vestibulum dictum posuere lorem at dapibus. Aliquam malesuada
              ipsum et viverra congue. Class aptent taciti sociosqu ad litora torquent per.
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default DetailInfo;
