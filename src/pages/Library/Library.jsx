import { useState } from "react";
import { addOwnBook } from "../../api/books";
import AddBook from "../../components/AddBook/AddBook";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import RecommendedPreview from "../../components/RecommendedPreview/RecommendedPreview";


function Library() {

  const [refreshKey, setRefreshKey] = useState(0);


  const handleAddBook = async (values) => {
    try {
      await addOwnBook(values);
      setRefreshKey(prev => prev + 1);
      } catch (error) {
      console.log(error);
    }
  };


  
  return (
      <section>
      <Dashboard>
        <AddBook onAdd={handleAddBook}/>
        <RecommendedPreview />
      </Dashboard>
        <MyLibraryBooks refreshKey={refreshKey}/>
      </section>
    );
}
export default Library;