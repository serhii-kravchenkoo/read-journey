import styles from "./Register.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(7, "Minimum 7 characters").required("Password is required"),});

const Register = () => {
  const navigate = useNavigate();
  
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Expand your mind, reading a book</h1>

        <Formik
  initialValues={{ name: "", email: "", password: "" }}
  validationSchema={validationSchema}
  onSubmit={async (values, { setSubmitting }) => {
    try {
      const data = await signupUser(values);

      localStorage.setItem("token", data.token);

      navigate("/recommended");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup error");
    } finally {
      setSubmitting(false);
    }
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
        
        <Link to="/login" className={styles.link}>Already have an account? </Link>
      </div>
    </section>
  );
};

export default Register;