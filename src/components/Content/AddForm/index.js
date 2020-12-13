import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../consts';
import { Close } from '../../UI';
import { gsap } from 'gsap';
import { useStore } from '../../../hooks';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import img from '../../../assets/icons/image.svg';

// https://www.npmjs.com/package/react-html5-camera-photo
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const AddForm = observer(({ active, setActive, setRedirect }) => {
  const { baublesStore } = useStore();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [style, setStyle] = useState('color');
  const [color, setColor] = useState('red');
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const bauble = baublesStore.baubleFromUser;

  const history = useHistory();
  const { treeId } = useParams();

  let titleRef,
    nameRef,
    messageRef,
    submitRef,
    styleRef,
    inputNone = useRef(null);

  useEffect(() => {
    setActive(true);
    setRedirect(false);
  }, [setActive, setRedirect]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await bauble.setInfo({ name, text, treeId, style, color, image: { file: file, url: preview } });

    // Push to database
    await bauble.create();

    // Get updated bauble with right id
    const updatedBauble = baublesStore.baubleFromUser;
    updatedBauble.setOrigin('data');
    history.push(ROUTES.tree.to + treeId + ROUTES.detail.to + updatedBauble.id);
  };

  const animation = {
    opacity: active ? 1 : 0,
    text: {
      yPos: active ? 0 : 150,
      delay: active ? 0.5 : 0.1,
      stagger: active ? 0.1 : -0.1,
      duration: active ? 0.6 : 0.6,
    },
  };

  useEffect(() => {
    gsap.to([titleRef, styleRef, nameRef, messageRef, submitRef], {
      duration: animation.text.duration,
      y: animation.text.yPos,
      opacity: animation.opacity,
      delay: animation.text.delay,
      stagger: {
        ease: 'Power2.easeIn',
        amount: animation.text.stagger,
      },
    });
  });

  // const handleClickClose = async () => {
  //   setActive(false);
  //   baublesStore.removeBaubleFromUser();
  //   history.push(ROUTES.tree.to + treeId);
  // };

  const handleLoadImage = (target) => {
    const targetFile = target.files[0];
    const imageURL = URL.createObjectURL(targetFile);
    setPreview(imageURL);
    setFile(targetFile);
    setStyle('image');

    bauble.setImage({ file: targetFile, url: imageURL });
  };

  const handleClickRemoveImage = () => {
    setPreview('');
    setStyle('color');
    bauble.setStyle('color');
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
    bauble.setColor(e.target.value);
  };

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log('takePhoto');
  };

  return (
    <div className={styles.form__wrapper}>
      {/* <Close handleClickClose={handleClickClose} active={active} /> */}
      <p
        ref={(el) => {
          titleRef = el;
        }}
        className={styles.form__title}
      >
        Write your message
      </p>
      <div>
        <form className={styles.form} onSubmit={(e) => handleSubmitForm(e)}>
          <fieldset
            className={styles.form__style}
            ref={(el) => {
              styleRef = el;
            }}
            htmlFor="message"
          >
            <p className={styles.style__title}>Style</p>
            <div className={styles.style__circles}>
              <div className={styles.style__colors}>
                <label htmlFor="red" className="hidden">
                  Red
                </label>
                <input
                  name="color"
                  value="red"
                  id="red"
                  type="radio"
                  className={`${styles.circle} ${styles.circleRed}`}
                  onChange={(e) => handleChangeColor(e)}
                  checked={color === 'red' && true}
                />
                <label htmlFor="blue" className="hidden">
                  Blue
                </label>
                <input
                  name="color"
                  value="blue"
                  id="blue"
                  type="radio"
                  onChange={(e) => handleChangeColor(e)}
                  className={`${styles.circle} ${styles.circleBlue}`}
                  checked={color === 'blue' && true}
                />
                <label htmlFor="blue" className="hidden">
                  Blue
                </label>
                <input
                  name="color"
                  value="green"
                  id="green"
                  type="radio"
                  onChange={(e) => handleChangeColor(e)}
                  className={`${styles.circle} ${styles.circleGreen}`}
                  checked={color === 'green' && true}
                />
                <input
                  className="hidden"
                  name="color"
                  value="none"
                  id="none"
                  type="radio"
                  ref={inputNone}
                  onChange={(e) => handleChangeColor(e)}
                  checked={style === 'image' && true}
                />
              </div>
              <div className={styles.style__image}>
                {/* <Camera
                  onTakePhoto={(dataUri) => {
                    handleTakePhoto(dataUri);
                  }}
                /> */}
                <label htmlFor="image" className="hidden">
                  Image
                </label>
                <input
                  style={{
                    background: `center / cover no-repeat url(${preview ? preview : img})`,
                  }}
                  type="file"
                  accept="image/*"
                  id="image"
                  name="filename"
                  className={`${styles.circle} ${styles.circleImage} ${preview && styles.circleImageActive}`}
                  onChange={(e) => handleLoadImage(e.currentTarget)}
                />
                {preview && <p onClick={handleClickRemoveImage}>Remove</p>}
              </div>
            </div>
          </fieldset>

          <label
            ref={(el) => {
              nameRef = el;
            }}
            htmlFor="name"
          >
            <span>Name</span>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              maxLength="15"
              required
            />
          </label>
          <label
            ref={(el) => {
              messageRef = el;
            }}
            htmlFor="message"
          >
            <span>Message</span>
            <textarea
              id="message"
              value={text}
              cols="50"
              rows="5"
              onChange={(e) => setText(e.currentTarget.value)}
              maxLength="200"
              required
            />
          </label>
          <div className={styles.form__buttons}>
            <button
              ref={(el) => {
                submitRef = el;
              }}
              className={styles.form__submit}
              type="submit"
            >
              Add my message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddForm;
