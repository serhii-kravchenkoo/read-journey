import { Link } from "react-router-dom";

export default function Description() {
  return (
      <div>
          <h2>Start your workout</h2>
          <p>Create a personal library: add the books you intend to read to it.</p>
          <p>Create your first workout: define a goal, choose a period, start training.</p>
          <Link to="/library">My library</Link>
    </div>
  );
}