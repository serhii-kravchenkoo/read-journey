import { useParams } from "react-router-dom";

export default function Reading() {

  const { id } = useParams();

  return (
    <section>
      <h1>Reading page</h1>
      <p>Book id: {id}</p>
    </section>
  );
}