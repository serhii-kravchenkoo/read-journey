import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Filters.module.css';

const validationSchema = Yup.object({
  title: Yup.string(),
  author: Yup.string(),
});

export default function Filters({ onSubmit }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Filters:</p>
      <Formik
        initialValues={{ title: '', author: '' }}
        validationSchema={validationSchema}
        onSubmit={values => {
          onSubmit(values);
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

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.button}>
              To apply
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
