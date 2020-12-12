import React, { useState, useRef, useEffect } from 'react';
import { ROUTES } from '../../../consts';
import { useStore } from '../../../hooks';
import Tree from '../../../models/Tree';
import { gsap } from 'gsap';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

const Create = ({ setShowDecoration, setShowIntroCanvas }) => {
  const [active, setActive] = useState(true);
  const [name, setName] = useState('');
  const { treeStore } = useStore();
  const history = useHistory();

  useEffect(() => {
    setShowDecoration(false);
  }, [setShowDecoration]);

  let title,
    intro,
    label,
    button = useRef(null);

  const animation = {
    // show : hide
    opacity: active ? 1 : 0,
    text: {
      yPos: active ? 0 : -150,
      delay: active ? 0.35 : 0.1,
      stagger: active ? 0.1 : 0.1,
      duration: active ? 1 : 0.6,
    },
  };

  useEffect(() => {
    gsap.to([title, intro, label, button], {
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const tree = new Tree({
      store: treeStore,
      name: name,
    });

    await tree.create();
    setActive(false);
    setShowIntroCanvas(false);

    setTimeout(() => {
      history.push(ROUTES.tree.to + tree.id);
    }, 550); // Wait for canvas to finish animating end
  };

  return (
    <>
      <div className={styles.create}>
        <h1
          ref={(el) => {
            title = el;
          }}
          className={styles.title}
        >
          Creating your tree
        </h1>
        <p
          className={styles.intro}
          ref={(el) => {
            intro = el;
          }}
        >
          Your digital tree is almost ready to be planted. Give your tree a name and you are ready to go.
        </p>
        <form className={styles.form} onSubmit={(e) => handleSubmitForm(e)}>
          <label
            className={styles.label}
            ref={(el) => {
              label = el;
            }}
            htmlFor="name"
          >
            <span>Name</span>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} required />
          </label>
          <button
            ref={(el) => {
              button = el;
            }}
            className={styles.button}
            type="submit"
          >
            Plant my tree
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
