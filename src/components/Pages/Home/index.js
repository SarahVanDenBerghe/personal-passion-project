import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Button } from '../../UI';
import { HomeTrees } from '../../Scene';
import { ROUTES } from '../../../consts';
import { useLocation, useHistory } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './styles.module.scss';
import { useTreeStore } from '../../../hooks';
import Tree from '../../../models/Tree';

const Home = () => {
  const [active, setActive] = useState(true);
  const [name, setName] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();
  const treeStore = useTreeStore();

  let title,
    intro,
    button = useRef(null);

  // const animation = {
  //   // show : hide
  //   opacity: active ? 1 : 0,
  //   text: {
  //     yPos: active ? 0 : -150,
  //     delay: active ? 0.35 : 0.1,
  //     stagger: active ? 0.1 : 0.1,
  //     duration: active ? 1 : 0.6,
  //   },
  // };

  // useEffect(() => {
  //   gsap.to([title, intro, button], {
  //     duration: animation.text.duration,
  //     y: animation.text.yPos,
  //     opacity: animation.opacity,
  //     delay: animation.text.delay,
  //     stagger: {
  //       ease: 'Power2.easeIn',
  //       amount: animation.text.stagger,
  //     },
  //   });
  // }, [active]);

  const handleClickButton = () => {
    setActive(false);
    // if (pathname === ROUTES.add.to) {
    //   history.push(ROUTES.home);
    // } else {
    //   history.push(ROUTES.add.to);
    // }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const tree = new Tree({
      store: treeStore,
      name: name,
    });

    await tree.create();

    // // Get updated bauble with right id
    // const updatedBauble = baublesStore.baubleFromUser;
    // updatedBauble.setOrigin('data');
    // history.push(`${ROUTES.detail.to}${updatedBauble.id}`);
  };

  return (
    <>
      <div className={styles.home}>
        <div className={styles.home__text}>
          {/* <h1
            className={styles.text__title}
            ref={(el) => {
              title = el;
            }}
          >
            Create your own <span className={styles.highlight}>Christmas tree</span>
          </h1>
          <p
            className={styles.text__info}
            ref={(el) => {
              intro = el;
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid idunt ut labore et sed
            do eiusmod tempor inci.
          </p>
          <div
            onClick={handleClickButton}
            className={styles.add__tree}
            ref={(el) => {
              button = el;
            }}
          >
            <Button text="Create a tree" />
          </div> */}
          <div>
            <h2 className={styles.text__subtitle}>Creating your tree</h2>
            <p>Your digital tree is almost ready to be planted. Give your tree a name and you are ready to go.</p>
            <form className={styles.form} onSubmit={(e) => handleSubmitForm(e)}>
              <label htmlFor="name">
                <span>Name</span>

                <input id="name" type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} required />
              </label>
              <button className={styles.form__submit} type="submit">
                Plant my tree
              </button>
            </form>
          </div>
        </div>
        {/* <Suspense fallback={<h1>Loading posts...</h1>}>
          <HomeTrees />
        </Suspense> */}
      </div>
    </>
  );
};

export default Home;
