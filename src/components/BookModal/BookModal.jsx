import { useEffect } from "react";
import { createPortal } from "react-dom";
import { addBookFromRecommend } from "../../api/books";

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

  const handleAddToLibrary = async () => {
  try {
    await addBookFromRecommend(book._id);
    onClose();
  } catch (error) {
    if (error.response?.status === 409) {
      alert("Ця книга вже є у бібліотеці");
    } else {
      console.error(error);
    }
  }
};

  return createPortal(
    <div onClick={onClose} style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}>
      <div style={{
          background: "white",
          padding: 20,
          minWidth: 300,
        }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <button onClick={handleAddToLibrary}>Add to library</button>
      </div>
    </div>,
    modalRoot
  );
}