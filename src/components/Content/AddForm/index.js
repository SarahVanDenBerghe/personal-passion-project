import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../consts';
import { gsap } from 'gsap';
import { useBaublesStore } from '../../../hooks';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import './styles.scss';

const AddForm = observer(({ active, setActive }) => {
  const baublesStore = useBaublesStore();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const history = useHistory();

  let titleRef,
    nameRef,
    messageRef,
    locationRef,
    submitRef,
    cancelRef = useRef(null);

  useEffect(() => {
    setActive(true);
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const bauble = baublesStore.baubleFromUser;
    bauble.setInfo({ name, text, location });

    // Push to database
    await bauble.create();

    // Get updated bauble with right id
    const updatedBauble = baublesStore.baubleFromUser;
    updatedBauble.setOrigin('data');
    history.push(`${ROUTES.detail.to}${updatedBauble.id}`);
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
    baublesStore.removeBaubleFromUser();
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
              value={text}
              cols="50"
              rows="5"
              onChange={(e) => setText(e.currentTarget.value)}
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
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
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
          onClick={action((e) => handleClickClose())}
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
});

export default AddForm;
