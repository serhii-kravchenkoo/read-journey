import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modal-root");

export default function ModalBook({ book, onClose }) {

  const navigate = useNavigate();

  const handleStartReading = () => {
    navigate(`/reading/${book._id}`);
  };

  return createPortal(
    <div onClick={onClose}>

      <div onClick={(e) => e.stopPropagation()}>

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