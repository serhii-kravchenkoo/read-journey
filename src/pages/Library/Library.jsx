import AddBook from "../../components/AddBook/AddBook";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import RecommendedBlock from "../../components/RecommendedBlock/RecommendedBlock";

function Library() {
  return (
      <section>
      <Dashboard>
        <AddBook />
        <RecommendedBlock />
      </Dashboard>
        <MyLibraryBooks />
      </section>
    );
}
export default Library;