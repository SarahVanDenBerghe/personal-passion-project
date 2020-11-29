import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { ROUTES } from '../../../consts';
import { gsap } from 'gsap';
import axios from 'axios';
import './styles.scss';

const AddForm = ({ active, setActive }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [place, setPlace] = useState('');
  const history = useHistory();

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_STRAPI_API}/messages`,
  });

  let titleRef,
    nameRef,
    messageRef,
    locationRef,
    submitRef,
    cancelRef = useRef(null);

  const handleSubmitForm = () => {
    api
      .post('', {
        name: name,
        message: message,
        // x: point.x,
        // y: point.y,
        // z: point.z,
      })
      .then((response) => {
        const newBauble = {
          name: response.data.name,
          x: response.data.x,
          y: response.data.y,
          z: response.data.z,
          message: response.data.message,
          id: response.data.id,
        };
        // Set new bauble in all baubles
        // setBaubles([...baubles, newBauble]);
        // Back home
        history.push(ROUTES.home);
      });
  };

  const animation = {
    // show : hide
    opacity: active ? 1 : 0,
    text: {
      yPos: active ? 0 : 150,
      delay: active ? 0.5 : 0.1,
      stagger: active ? 0.1 : -0.1,
      duration: active ? 0.6 : 0.6,
    },
  };

  useEffect(() => {
    gsap.to([titleRef, nameRef, messageRef, locationRef, submitRef, cancelRef], {
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

  const handleClickClose = () => {
    setActive(false);
    history.push(ROUTES.home);
  };

  return (
    <div className="form__wrapper">
      <p
        ref={(el) => {
          titleRef = el;
        }}
        className="form__title"
      >
        Write your message
      </p>
      <div>
        <form className="form" onSubmit={(e) => handleSubmitForm(e)}>
          <label
            ref={(el) => {
              nameRef = el;
            }}
            htmlFor="name"
            className="label"
          >
            <span>Name</span>
            <input
              id="name"
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />
          </label>
          <label
            ref={(el) => {
              messageRef = el;
            }}
            htmlFor="message"
            className="label"
          >
            <span>Message</span>
            <textarea
              id="message"
              className="textarea"
              value={message}
              cols="50"
              rows="5"
              onChange={(e) => setMessage(e.currentTarget.value)}
              required
            />
          </label>
          <label
            ref={(el) => {
              locationRef = el;
            }}
            htmlFor="place"
            className="label"
          >
            <span>Location</span>
            <input
              id="place"
              className="input"
              type="text"
              value={place}
              onChange={(e) => setPlace(e.currentTarget.value)}
              required
            />
          </label>
          <div className="form__buttons">
            <button
              ref={(el) => {
                submitRef = el;
              }}
              className="form__submit"
              type="submit"
            >
              Add my message
            </button>
          </div>
        </form>
        <button
          onClick={(e) => handleClickClose()}
          ref={(el) => {
            cancelRef = el;
          }}
          className="form__cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddForm;
