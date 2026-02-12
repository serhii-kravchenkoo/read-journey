import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { startReading, finishReading } from "../../api/books";

const validationSchema = Yup.object({
  page: Yup.number()
    .typeError("Must be a number")
    .required("Required")
    .min(1, "Page must be > 0"),
});

export default function AddReading({bookId, isReading, setIsReading,}) {

    const handleSubmit = async (values, { resetForm }) => {

    try {if (!isReading) { await startReading({bookId, page: Number(values.page),});
    setIsReading(true);

    } else {await finishReading({bookId, page: Number(values.page),});
    setIsReading(false);}

    resetForm();

    } catch (error) {

      // тут потім поставимо notification
      alert("Server error");
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ page: "0" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>

        <label>
          {isReading ? "Stop page:" : "Start page:"}
        </label>

        <Field
          name="page"
          type="number"
          placeholder="Page number"
        />

        <ErrorMessage name="page" component="div" />

        <button type="submit">
          {isReading ? "To stop" : "To start"}
        </button>

      </Form>
    </Formik>
  );
}