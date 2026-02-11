import { useParams } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";

export default function Reading() {

  const { id } = useParams();

  return (
    <section>
      <h1>Reading page</h1>
      <p>Book id: {id}</p>
        
          <Dashboard>
            <AddReading />
            <Details />
          </Dashboard>
          <MyBook />
    </section>
  )
}