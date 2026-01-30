export default function RecommendedBookCard({ book, onBookClick }) {
  return (
    <li>
      <img
        src={book.imageUrl}
        alt={book.title}
        width="120"
        onClick={() => onBookClick(book)}
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </li>
  );
}