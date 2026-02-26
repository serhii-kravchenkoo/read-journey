import styles from './FinishModal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modal-root');

export default function FinishModal({ onClose }) {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>
          <svg className={styles.closeIcon} width="22" height="22">
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>
        <img
          height="50"
          width="50"
          src="/books.png"
          alt="books"
          className={styles.img}
        />
        <h2 className={styles.title}>The book is read</h2>
        <p className={styles.text}>
          It was an <span className={styles.span}>exciting journey</span> ,
          where each page revealed new horizons, and the characters became
          inseparable <br />
          friends.
        </p>
      </div>
    </div>,
    modalRoot
  );
}
