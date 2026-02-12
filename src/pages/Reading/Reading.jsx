import { useParams } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useState, useEffect, useCallback } from "react"
import MyBook from "../../components/MyBook/MyBook";
import { getBookById } from "../../api/books";
import AddReading from "../../components/AddReading/AddReading";

export default function Reading() {

  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  // const [showFinishModal, setShowFinishModal] = useState(false);

  const fetchBook = useCallback (async () => {
  try {
    const data = await getBookById(id);
    setBook(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}, [id]);

useEffect(() => {
  fetchBook();
}, [fetchBook]);

  return (
    <section>
          <Dashboard>
            <AddReading bookId={id} isReading={isReading} setIsReading={setIsReading} refreshBook={fetchBook}/>
            {/* <Details /> */}
          </Dashboard>
      <MyBook book={ book} loading={loading}/>
    </section>
  )
}