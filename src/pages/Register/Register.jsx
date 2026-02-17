import styles from "./Register.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import phone1x from "../../img/iphone-mobile@1x.png";
import phone2x from "../../img/iphone-mobile@2x.png";
import phoneDesktop1x from "../../img/iphone-desctop@1x.png"
import phoneDesktop2x from "../../img/iphone-desctop@2x.png"

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(7, "Minimum 7 characters").required("Password is required"),});

const Register = () => {
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


        <h1 className={styles.title}>Expand your mind, reading <span className={styles.spanTitle}>a book</span></h1>
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
              <div className={styles.inputWrapper}>
                <span className={styles.inputLabel}>Name:</span>
                <Field name="name" type="text" className={styles.input} placeholder="Ilona Ratushniak" />
              </div>
              <ErrorMessage name="name" component="p" />
            </label>
            
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
    <ErrorMessage name="email" component="p" />
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
    <ErrorMessage name="password" component="p" />
            </label>
            <div className={styles.buttonWrapper}>
                  <button type="submit" className={styles.button}>
      Registration
            </button>
            <Link to="/login" className={styles.link}>Already have an account? </Link>
            </div>
  </Form>
        </Formik>
      </div>
      <div className={styles.phone}>
  <picture>
    {/* desktop */}
    <source 
      media="(min-width: 1440px)" 
      srcSet={`${phoneDesktop1x} 1x, ${phoneDesktop2x} 2x`} 
    />

    {/* tablet/mobile */}
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
};

export default Register;