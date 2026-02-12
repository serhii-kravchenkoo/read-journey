import { useParams } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useState, useEffect } from "react"
import MyBook from "../../components/MyBook/MyBook";
import { getBookById } from "../../api/books";

export default function Reading() {

  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [isReading, setIsReading] = useState(false);
  // const [showFinishModal, setShowFinishModal] = useState(false);

  useEffect(() => {

  const fetchBook = async () => {
    try {

      const data = await getBookById(id);

      setBook(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchBook();

}, [id]);

  return (
    <section>
          <Dashboard>
            {/* <AddReading />
            <Details /> */}
          </Dashboard>
      <MyBook book={ book} loading={loading}/>
    </section>
  )
}