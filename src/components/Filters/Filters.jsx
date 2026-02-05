import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string(),
  author: Yup.string(),
});

export default function Filters({onSubmit}) {
    return (
        <div>
        <p>Filters:</p>
        <Formik
      initialValues={{ title: "", author: "" }}
      validationSchema={validationSchema}
      onSubmit={values => {
        onSubmit(values);
      }}
      >
          <Form>
              <label>Book title:
          <Field name="title" placeholder="Enter text" />
          <ErrorMessage name="title" component="p" />
        </label>

              <label>The author:
          <Field name="author" placeholder="Enter text" />
          <ErrorMessage name="author" component="p" />
        </label>

        <button type="submit">To apply</button>
      </Form>
            </Formik>
            </div>
  );
}