import AddBook from "../../components/AddBook/AddBook";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import RecommendedPreview from "../../components/RecommendedPreview/RecommendedPreview";


function Library() {
  return (
      <section>
      <Dashboard>
        <AddBook />
        <RecommendedPreview />
      </Dashboard>
        <MyLibraryBooks />
      </section>
    );
}
export default Library;