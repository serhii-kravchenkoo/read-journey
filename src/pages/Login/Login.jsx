import styles from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { signinUser } from "../../api/auth";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Expand your mind, reading a book</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const data = await signinUser(values);
              localStorage.setItem("token", data.token);
              navigate("/recommended");
            } catch (error) {
              alert(error.response?.data?.message || "Login error");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <label className={styles.label}>
                Mail
                <Field
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="Your@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className={styles.error}
                />
              </label>

              <label className={styles.label}>
                Password
                <Field
                  name="password"
                  type="password"
                  className={styles.input}
                  placeholder="Yourpasswordhere"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className={styles.error}
                />
              </label>

              <div className={styles.btnsWrapper}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={isSubmitting}
                >
                  Log in
                </button>

                <Link to="/register" className={styles.link}>
                  Don’t have an account?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}