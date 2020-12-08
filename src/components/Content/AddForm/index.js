import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { gsap } from 'gsap';
import { useStore } from '../../../hooks';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import imgTest from '../../../assets/test.jpg';
import axios from 'axios';

const AddForm = observer(({ active, setActive, setRedirect }) => {
  const { baublesStore } = useStore();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [style, setStyle] = useState('color');
  const [color, setColor] = useState('red');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const bauble = baublesStore.baubleFromUser;

  const history = useHistory();
  const { treeId } = useParams();

  let titleRef,
    nameRef,
    messageRef,
    submitRef,
    cancelRef,
    inputNone,
    formRef = useRef(null);

  useEffect(() => {
    setActive(true);
    setRedirect(false);
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await bauble.setInfo({ name, text, treeId, style, color, image: file });

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
    gsap.to([titleRef, nameRef, messageRef, submitRef, cancelRef], {
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

  const handleClickClose = async () => {
    setActive(false);
    baublesStore.removeBaubleFromUser();
    history.push(ROUTES.tree.to + treeId);
  };

  const handleLoadImage = (target) => {
    const targetFile = target.files[0];
    const reader = new FileReader();

    // const formData = new FormData();
    // formData.append('files', targetFile);
    // // formData.append(`files.filename`, targetFile, targetFile.name);
    // // formData.append('ref', 'messages');
    // // formData.append('field', 'image');
    // // formData.append('refId', 680); // Error 500

    // axios
    //   .post(`http://localhost:1337/upload`, formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   })
    //   .then((res) => {
    //     console.log(res.data[0].id);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const handleLoadReader = (e) => {
      setImage(e.currentTarget.result);
      setFile(targetFile);
      setColor('');
      setStyle('image');
    };

    reader.addEventListener('load', handleLoadReader);
    reader.readAsDataURL(targetFile);
  };

  const handleClickRemoveImage = () => {
    setImage('');
    setStyle('color');
    setColor('none');
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
    bauble.setColor(e.target.value);
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
        <form
          className={styles.form}
          onSubmit={(e) => handleSubmitForm(e)}
          ref={(el) => {
            formRef = el;
          }}
        >
          <fieldset className={styles.form__style}>
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
                <label htmlFor="image" className="hidden">
                  Image
                </label>
                <input
                  style={{
                    backgroundImage: `url(${image && image})`,
                  }}
                  type="file"
                  accept="image/*"
                  id="image"
                  name="filename"
                  className={`${styles.circle} ${styles.circleImage} ${image && styles.circleImageActive}`}
                  onChange={(e) => handleLoadImage(e.currentTarget)}
                />
                {image && <p onClick={handleClickRemoveImage}>Remove</p>}
                {/* <input name="color" value="image" id="image" type="radio" /> */}
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

        <button
          ref={(el) => {
            cancelRef = el;
          }}
          onClick={() => handleClickClose()}
          className={styles.form__cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

export default AddForm;
