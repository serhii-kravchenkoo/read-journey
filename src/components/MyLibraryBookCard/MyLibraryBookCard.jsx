export default function MyLibraryBookCard({book, onDelete, onOpen}) {
  return (
    <li>

      <img
        src={book.image}
        alt={book.title}
        onClick={() => onOpen(book)}
      />

      <p>{book.title}</p>
      <p>{book.author}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(book._id);
        }}
      >
        Delete
      </button>

    </li>
  );
}