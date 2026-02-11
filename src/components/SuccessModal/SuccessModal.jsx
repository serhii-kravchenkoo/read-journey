import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./SuccessModal.module.css";

const modalRoot = document.getElementById("modal-root");

export default function SuccessModal({ onClose }) {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);

  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >

        <button className={css.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={css.icon}>👍</div>

        <h2 className={css.title}>Good job</h2>

        <p className={css.text}>
          Your book is now in <span>the library!</span> The joy knows no bounds
          and now you can start your training
        </p>

      </div>
    </div>,
    modalRoot
  );
}