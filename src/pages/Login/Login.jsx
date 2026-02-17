import styles from "./Login.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { signinUser } from "../../api/auth";

import phone1x from "../../img/iphone-mobile@1x.png";
import phone2x from "../../img/iphone-mobile@2x.png";
import phoneDesktop1x from "../../img/iphone-desctop@1x.png";
import phoneDesktop2x from "../../img/iphone-desctop@2x.png";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.register}>
        
        <div className={styles.logoWrapper}>
          <svg className={styles.logoIcon} width="42" height="17">
            <use href="/icons.svg#icon-logo"></use>
          </svg>
          <span className={styles.logoSpan}>READ JOURNEY</span>
        </div>

        <h1 className={styles.title}>
          Expand your mind, reading <span className={styles.spanTitle}>a book</span>
        </h1>

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
          <Form className={styles.form}>
            
            <label className={styles.label}>
              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Mail:</span>
                <Field
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="Your@email.com"
                />
              </div>
            </label>

            <label className={styles.label}>
              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Password:</span>
                <Field
                  name="password"
                  type="password"
                  className={styles.input}
                  placeholder="Yourpasswordhere"
                />
              </div>
            </label>

            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.button}>
                Log in
              </button>

              <Link to="/register" className={styles.link}>
                Don’t have an account?
              </Link>
            </div>
          </Form>
        </Formik>
      </div>

      <div className={styles.phone}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`${phoneDesktop1x} 1x, ${phoneDesktop2x} 2x`}
          />

          <img
            src={phone1x}
            srcSet={`${phone1x} 1x, ${phone2x} 2x`}
            alt="phone"
            className={styles.phoneImg}
          />
        </picture>
      </div>
    </section>
  );
}