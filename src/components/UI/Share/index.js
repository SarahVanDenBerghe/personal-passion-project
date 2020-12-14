import React, { useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './styles.module.scss';

const Share = () => {
  const tooltip = useRef(null);
  const copy = () => {
    let dummy = document.createElement('input'),
      text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    ReactTooltip.show(tooltip.current);

    setTimeout(() => {
      ReactTooltip.hide(tooltip.current);
    }, 2000);
  };

  return (
    <>
      <div className={styles.share}>
        <p className={styles.share__title}>Share</p>
        <ul className={styles.share__buttons}>
          <li>
            <p ref={tooltip} data-tip="copied!" />
            <button className={styles.icon + ' ' + styles.iconLink} onClick={() => copy()} aria-label="Copy link" />
            <ReactTooltip />
          </li>
          <li>
            <a
              aria-label="Share on Twitter"
              className={styles.icon + ' ' + styles.iconTwitter}
              href={`http://twitter.com/share?text=Check out this Christmas wish!&url=${window.location.href}`}
              target="_blank"
              rel="noopener"
            >
              <span className="hidden">Share on Twitter</span>
            </a>
          </li>
          <li>
            <a
              aria-label="Share on Facebook"
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              className={styles.icon + ' ' + styles.iconFacebook}
              target="_blank"
              rel="noopener"
            >
              <span className="hidden">Share on Facebook</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Share;
