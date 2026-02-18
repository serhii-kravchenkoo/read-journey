import { useState } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Description from '../../components/Description/Description';
import Filters from '../../components/Filters/Filters';
import Quote from '../../components/Quote/Quote';
import RecommendedBooks from '../../components/RecommendedBooks/RecommendedBooks';
import styles from './Recommended.module.css';

export default function Recommended() {
  const [filters, setFilters] = useState({ title: '', author: '' });

  return (
    <section className={styles.section}>
      <Dashboard>
        <Filters
          onSubmit={values => {
            setFilters(values);
          }}
        />
        <Description />
        <Quote />
      </Dashboard>
      <RecommendedBooks filters={filters} />
    </section>
  );
}
