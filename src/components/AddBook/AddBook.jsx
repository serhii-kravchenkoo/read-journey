import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddBook.module.css';

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  author: Yup.string().required('Required'),
  totalPages: Yup.number().typeError('Must be number').required('Required'),
});

export default function AddBook({ onAdd }) {
  return (
    <div className={styles.addBook}>
      <h3 className={styles.title}>Create your library:</h3>

      <Formik
        initialValues={{
          title: '',
          author: '',
          totalPages: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          onAdd(values);
        }}
      >
        <Form className={styles.form}>
          <label className={styles.label}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Book title:</span>
              <Field
                name="title"
                placeholder="Enter text"
                className={styles.input}
              />
            </div>
            <ErrorMessage name="title" component="p" />
          </label>

          <label className={styles.label}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>The author:</span>
              <Field
                name="author"
                placeholder="Enter text"
                className={styles.input}
              />
            </div>
            <ErrorMessage name="author" component="p" />
          </label>

          <label className={styles.label}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputLabel}>Number of pages:</span>
              <Field
                name="totalPages"
                placeholder="0"
                type="number"
                className={styles.input}
              />
            </div>
            <ErrorMessage name="totalPages" component="p" />
          </label>

          <button type="submit" className={styles.button}>
            Add book
          </button>
        </Form>
      </Formik>
    </div>
  );
}
