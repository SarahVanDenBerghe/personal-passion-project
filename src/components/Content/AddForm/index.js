import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../consts';
import { gsap } from 'gsap';
import { useStore } from '../../../hooks';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import styles from './styles.module.scss';

const useWindowSize = () => {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const AddForm = observer(({ active, setActive, setRedirect }) => {
  const { baublesStore } = useStore();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [style, setStyle] = useState('color');
  const [color, setColor] = useState('red');
  const [preview, setPreview] = useState(null);
  const [imageOrigin, setImageOrigin] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const bauble = baublesStore.baubleFromUser;
  const width = useWindowSize();

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
    if (!loading && bauble) {
      setLoading(true);
      await bauble.setInfo({ name, text, treeId, style, color, image: { file: file, url: preview } });
      await bauble.create();
      const updatedBauble = await baublesStore.baubleFromUser;
      updatedBauble.setOrigin('data');
      history.push(ROUTES.tree.to + treeId + ROUTES.detail.to + updatedBauble.id);
      setLoading(false);
    }
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

  const handleLoadImage = (target) => {
    const targetFile = target.files[0];
    console.log(targetFile);
    const imageURL = URL.createObjectURL(targetFile);
    setPreview(imageURL);
    setFile(targetFile);
    setImageOrigin('upload');
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

  const handleTakePhoto = async (dataUri) => {
    setCameraActive(false);
    const base64Response = await fetch(`${dataUri}`);
    const blob = await base64Response.blob();
    const imageURL = URL.createObjectURL(blob);
    const file = new File([blob], 'Camera picture');
    setPreview(imageURL);
    setImageOrigin('camera');
    setFile(file);
    setStyle('image');
    bauble.setImage({ file: file, url: imageURL });
  };

  return (
    <div className={styles.form__wrapper}>
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

              <div className={styles.style__custom}>
                {!preview && (
                  <>
                    {!cameraActive && (
                      <div className={styles.style__image}>
                        <label htmlFor="image" className="hidden">
                          Image
                        </label>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          id="image"
                          name="filename"
                          className={`${styles.circle} ${styles.circleImage}`}
                          onChange={(e) => handleLoadImage(e.currentTarget)}
                        />
                      </div>
                    )}
                    {width > 768 && (
                      <div className={styles.style__camera}>
                        <button
                          onClick={(e) => {
                            setCameraActive(true);
                            e.preventDefault();
                          }}
                          className={`${styles.circle} ${styles.circleCamera}`}
                        />
                      </div>
                    )}
                  </>
                )}
                {cameraActive && (
                  <p className={styles.style__remove} onClick={() => setCameraActive(false)}>
                    Cancel
                  </p>
                )}
                {preview && (
                  <>
                    <div
                      className={styles.style__customPreview}
                      style={{
                        background: `center / cover no-repeat url(${preview ? preview : ''})`,
                      }}
                    ></div>
                    <p className={styles.style__remove} onClick={handleClickRemoveImage}>
                      Remove
                    </p>
                  </>
                )}
              </div>
            </div>
            {cameraActive && (
              <Camera
                isSilentMode={true}
                onTakePhoto={(dataUri) => {
                  handleTakePhoto(dataUri);
                }}
              />
            )}
          </fieldset>

          <label
            className={styles.label__name}
            ref={(el) => {
              nameRef = el;
            }}
            htmlFor="name"
          >
            <span>Name</span>
            <input
              autoComplete="off"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              maxLength="15"
              required
            />
          </label>
          <label
            className={styles.label__message}
            ref={(el) => {
              messageRef = el;
            }}
            htmlFor="message"
          >
            <span>Message</span>
            <textarea
              autoComplete="off"
              id="message"
              value={text}
              cols="50"
              rows="3"
              onChange={(e) => setText(e.currentTarget.value)}
              maxLength="200"
              required
            />
          </label>
          <div
            className={styles.form__buttons}
            ref={(el) => {
              submitRef = el;
            }}
          >
            <button className={styles.form__submit} type="submit">
              Add my message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddForm;
