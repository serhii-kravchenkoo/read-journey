import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function BookModal({ book, onClose }) {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
      </div>
    </div>,
    modalRoot
  );
}