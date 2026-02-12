import Loader from "../Loader/Loader";

export default function MyBook({book, loading}) {

          if (loading) return <Loader />;
          if (!book) return null;

    return (
      
      <div>
          <h2>My reading</h2>
      <img
        src={book.imageUrl}
        alt={book.title}
        width="120"
      />
      <h3>{book.title}</h3>
        <p>{book.author}</p>
        <svg></svg>
    </div>
  );
}