import styles from "./FinishModal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.getElementById("modal-root");

export default function FinishModal({ onClose }) {
    
    useEffect(() => {
        const handleEsc = e => {
          if (e.key === "Escape") {
            onClose();
          }
        };
    
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
      }, [onClose]);

  return createPortal (
    <div className={styles.overlay} onClick={onClose}> 
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <h2>The book is read</h2>
        <p>
          It was an exciting journey, where each page revealed new horizons,
          and the characters became inseparable friends.
        </p>
          </div>
      </div>,
      modalRoot
    );
}