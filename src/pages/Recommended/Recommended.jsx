import { useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Description from "../../components/Description/Description";
import Filters from "../../components/Filters/Filters";
import Quote from "../../components/Quote/Quote";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";

export default function Recommended() {

  const [filters, setFilters] = useState({ title: "", author: "" });

  return (
    <section>
      <Dashboard>
        <Filters onSubmit={setFilters } />
        <Description />
        <Quote/>
      </Dashboard>
      <RecommendedBooks filters={filters} />
    </section>
  );
}