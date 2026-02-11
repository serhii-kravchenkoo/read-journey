import { useState } from "react";
import { addOwnBook } from "../../api/books";
import AddBook from "../../components/AddBook/AddBook";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import RecommendedPreview from "../../components/RecommendedPreview/RecommendedPreview";
import { toast } from "react-toastify";
import SuccessModal from "../../components/SuccessModal/SuccessModal";


function Library() {

  const [refreshKey, setRefreshKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleAddBook = async (values) => {
    try {
      await addOwnBook(values);
      toast.success("Book added");
      setRefreshKey(prev => prev + 1);
      setShowSuccess(true);
      } catch (error) {
      toast.error(error.message);
    }
  };

  return (
      <section>
      <Dashboard>
        <AddBook onAdd={handleAddBook}/>
        <RecommendedPreview />
      </Dashboard>
      <MyLibraryBooks refreshKey={refreshKey} />
      {showSuccess && (<SuccessModal onClose={() => setShowSuccess(false)} />)}
      </section>
    );
}
export default Library;