import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import css from './ModalBook.module.css';
import { useEffect } from 'react';
import placeholder from '../../img/placeholder-boo.png';

const modalRoot = document.getElementById('modal-root');

export default function ModalBook({ book, onClose }) {
  const navigate = useNavigate();

  const handleStartReading = () => {
    navigate(`/reading/${book._id}`);
  };
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div onClick={onClose} className={css.backdrop}>
      <div onClick={e => e.stopPropagation()} className={css.modalContent}>
        <button onClick={onClose}>
          <svg className={css.closeIcon} width="22" height="22">
            <use href="/icons.svg#icon-x" />
          </svg>
        </button>
        <img
          src={book.imageUrl || placeholder}
          alt={book.title}
          className={css.image}
        />
        <h2 className={css.title}>{book.title?.trim().split(/\s+/)[0]}</h2>
        <p className={css.author}>{book.author}</p>
        <p className={css.totalPages}>{book.totalPages} pages</p>

        <button className={css.startReadingButton} onClick={handleStartReading}>
          Start reading
        </button>
      </div>
    </div>,
    modalRoot
  );
}
