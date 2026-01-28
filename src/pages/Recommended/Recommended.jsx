import Dashboard from "../../components/Dashboard/Dashboard";
import Description from "../../components/Description/Description";
import Filters from "../../components/Filters/Filters";
import Quote from "../../components/Quote/Quote";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";

export default function Recommended() {
  return (
    <section>
      <Dashboard>
        <Filters />
        <Description />
        <Quote/>
      </Dashboard>
      <RecommendedBooks />
    </section>
  );
}