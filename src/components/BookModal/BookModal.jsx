import { useEffect } from "react";
import { createPortal } from "react-dom";
import { addBookFromRecommend } from "../../api/books";

const modalRoot = document.getElementById("modal-root");

export default function BookModal({ book, onClose, alreadyAdded }) {

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
    const addedBook = await addBookFromRecommend(book._id);
    onClose(addedBook);
  } catch (error) {
    if (error) {
      console.log("Error", error);
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
        <button onClick={handleAddToLibrary} disabled={alreadyAdded}> {alreadyAdded ? "Already in library" : "Add to library"}</button>
      </div>
    </div>,
    modalRoot
  );
}