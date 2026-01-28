import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string(),
  author: Yup.string(),
});

export default function Filters() {
    return (
        <div>
        <p>Filters:</p>
        <Formik
      initialValues={{ title: "", author: "" }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        console.log("filters submit:", values);

        // ТУТ далі:
        // api.get("/books/recommend", { params: values })
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