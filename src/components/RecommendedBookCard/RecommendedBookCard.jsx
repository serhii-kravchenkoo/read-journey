export default function RecommendedBookCard({ book }) {
  return (
    <li>
      <img
        src={book.imageUrl}
        alt={book.title}
        width="120"
      />
      <p>{book.title}</p>
      <p>{book.author}</p>
    </li>
  );
}