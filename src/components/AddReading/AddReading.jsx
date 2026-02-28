import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { startReading, finishReading } from '../../api/books';
import styles from './AddReading.module.css';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  page: Yup.number()
    .typeError('Must be a number')
    .required('Enter the page number')
    .min(1, 'Page must be > 0'),
});

export default function AddReading({
  bookId,
  isReading,
  setIsReading,
  refreshBook,
}) {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (!isReading) {
        await startReading({ bookId, page: Number(values.page) });
        setIsReading(true);
      } else {
        await finishReading({ bookId, page: Number(values.page) });
        setIsReading(false);
        await refreshBook();
      }
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={{ page: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.label}>
          {isReading ? 'Stop page:' : 'Start page:'}
        </label>

        <div className={styles.inputWrapper}>
          <span className={styles.span}>Page number:</span>
          <Field
            name="page"
            type="number"
            className={styles.input}
            placeholder="0"
          />
        </div>
        <ErrorMessage name="page" component="div" />

        <button className={styles.readingButton} type="submit">
          {isReading ? 'To stop' : 'To start'}
        </button>
      </Form>
    </Formik>
  );
}
