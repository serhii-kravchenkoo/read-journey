import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { addBookFromRecommend } from '../../api/books';
import styles from './BookModal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function BookModal({ book, onClose, alreadyAdded }) {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleAddToLibrary = async () => {
    try {
      await addBookFromRecommend(book._id);
      onClose();
    } catch (error) {
      if (error) {
        console.log('Error', error);
      } else {
        console.error(error);
      }
    }
  };

  return createPortal(
    <div onClick={onClose} className={styles.overlay}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>
          <svg className={styles.closeIcon} width="22" height="22">
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>
        <img src={book.imageUrl} alt={book.title} className={styles.image} />
        <h2 className={styles.title}>{book.title?.trim().split(/\s+/)[0]}</h2>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.totalPages}>{book.totalPages} pages</p>
        <button
          className={styles.addToLibraryButton}
          onClick={handleAddToLibrary}
          disabled={alreadyAdded}
        >
          {alreadyAdded ? 'Already in library' : 'Add to library'}
        </button>
      </div>
    </div>,
    modalRoot
  );
}
