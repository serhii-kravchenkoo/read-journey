import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddBook.module.css";

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
  totalPages: Yup.number()
    .typeError("Must be number")
    .required("Required"),
});

export default function AddBook({onAdd}) {
  return (
    <div className={css.wrapper}>
      <h3>Create your library:</h3>

      <Formik
        initialValues={{
          title: "",
          author: "",
          totalPages: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onAdd(values);
        }}
      >
        <Form className={css.form}>

          <div className={css.field}>
            <span>Book title:</span>
            <Field name="title" placeholder="Enter text" />
          </div>
          <ErrorMessage name="title" component="p" />

          <div className={css.field}>
            <span>The author:</span>
            <Field name="author" placeholder="Enter text" />
          </div>
          <ErrorMessage name="author" component="p" />

          <div className={css.field}>
            <span>Number of pages:</span>
            <Field name="totalPages" placeholder="0" />
          </div>
          <ErrorMessage name="totalPages" component="p" />

          <button type="submit">
            Add book
          </button>

        </Form>
      </Formik>
    </div>
  );
}