import React from 'react';
import styles from './styles.module.scss';

const Share = () => {
  return (
    <>
      <div className={styles.share}>
        <p className={styles.share__title}>Share</p>
        <ul className={styles.share__buttons}>
          <li>
            <a className={styles.icon + ' ' + styles.iconLink} href={window.location.href} target="_blank">
              <span className="hidden">Link</span>
            </a>
          </li>
          <li>
            <a
              className={styles.icon + ' ' + styles.iconTwitter}
              href={`http://twitter.com/share?text=Check out this Christmas wish!&url=${window.location.href}`}
              target="_blank"
            >
              <span className="hidden">Twitter</span>
            </a>
          </li>
          <li>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              className={styles.icon + ' ' + styles.iconFacebook}
              target="_blank"
            >
              <span className="hidden">Facebook</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Share;
