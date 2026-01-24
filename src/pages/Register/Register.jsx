import styles from "./Register.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),});

const Register = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Expand your mind, reading a book</h1>

        <Formik
  initialValues={{ name: "", email: "", password: "" }}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    console.log(values);
  }}
>
  <Form className={styles.form}>
    <label className={styles.label}>
      Name
      <Field name="name" type="text" className={styles.input} placeholder="Ilona Ratushniak"/>
      <ErrorMessage name="name" component="p" />
    </label>

    <label className={styles.label}>
      Email
      <Field name="email" type="email" className={styles.input} placeholder="Your@email.com"/>
      <ErrorMessage name="email" component="p" />
    </label>

    <label className={styles.label}>
      Password
      <Field name="password" type="password" className={styles.input} placeholder="Yourpasswordhere"/>
      <ErrorMessage name="password" component="p" />
    </label>

    <button type="submit" className={styles.button}>
      Registration
    </button>
  </Form>
</Formik>

        <p className={styles.text}>
          Already have an account?{" "}
          <a href="/login" className={styles.link}>
            Log in
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;