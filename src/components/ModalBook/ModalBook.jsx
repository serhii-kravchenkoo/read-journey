import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import css from "./ModalBook.module.css";
import { useEffect } from "react";

const modalRoot = document.getElementById("modal-root");

export default function ModalBook({ book, onClose }) {

  const navigate = useNavigate();

  const handleStartReading = () => {
    navigate(`/reading/${book._id}`);
    };
    useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleEsc);

  return () => {
    window.removeEventListener("keydown", handleEsc);
  };
}, [onClose]);
    
    
  return createPortal(
    <div onClick={onClose} className={css.backdrop}>

      <div onClick={(e) => e.stopPropagation()} className={css.modal}>

        <button onClick={onClose}>X</button>

        <h2>{book.title}</h2>
        <p>{book.author}</p>

        <button onClick={handleStartReading}>
          Start reading
        </button>

      </div>

    </div>,
    modalRoot
  );
}