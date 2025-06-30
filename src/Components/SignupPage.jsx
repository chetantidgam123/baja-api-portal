
import { post_data } from "../ApiServices";
import { convertToPayload } from "../Utils";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import { signupFormSchema } from "../Schema";
import { Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import FloatingInputLabel from "./user/UtilComponent/FloatingInputLabel";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import { error_swal_toast, success_swal_toast } from "../SwalServices";
import { useEffect } from "react";
function SignupPage({ show, setShow, showLogin, setShowLogin }) {
  const location = useLocation();
  const signupForm = useFormik({
    initialValues: {
      fullName: "",
      mobileNo: "",
      emailId: "",
      userPassword: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: signupFormSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      handleSubmit();
    },

  })

  const handleSubmit = () => {
    let payload = {
      fullName: signupForm.values.fullName,
      mobileNo: signupForm.values.mobileNo,
      emailId: signupForm.values.emailId,
      userPassword: signupForm.values.userPassword,
    }
    post_data("public", convertToPayload('register-user', payload), {})
      .then((response) => {
        if (response.status) {
          setShowLogin(true);
          success_swal_toast(response.data.message || "User registered successfully");
        } else {
          error_swal_toast(response.data.message || "Something went wrong");
        }
      }).catch((error) => {
        error_swal_toast(error.message || "Something went wrong");
        console.error("Error during signup:", error);
      })
  };

  useEffect(() => {
    if (location.pathname.includes('reset')) {
      setShowLogin(true);
    }
  }, [location])

  return (
    <div className="col-12 px-3">
      <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-5 col-12 signUpsideBanner">
          <img src="/assets/img/Bajaj Logo.png" alt="NA" className="mt-2" />
        </div>
        <div className="col-xl-7 col-lg-7 col-md-7 col-12 ps-4">
          {!showLogin && <div>
            <h3>Sign Up</h3>
            <p>Create an account to get started</p>
            <FormikProvider value={signupForm}>
              <Form className="" autoComplete="off">
                <div className="">
                  <FloatingInputLabel fieldName={`fullName`} formikFrom={signupForm} labelText={`Full Name`} />
                </div>
                <div className="">
                  <FloatingInputLabel fieldName={`emailId`} formikFrom={signupForm} labelText={`Email Address`} />
                </div>
                <div className="">
                  <FloatingInputLabel fieldName={`mobileNo`} formikFrom={signupForm} labelText={`Phone Number`} />
                </div>
                <div className="">
                  <FloatingInputLabel fieldName={`userPassword`} formikFrom={signupForm} labelText={`Password`} />
                </div>
                <div className="d-none">
                  <label className="form-label mb-1" htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter your password" className="form-control"
                    value={signupForm.values.confirmPassword} onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} />
                  <ErrorMessage name={`confirmPassword`} component="small" className='text-danger' />
                </div>
                <div className="">
                  <label className="form-label mb-1" htmlFor="userPassword">
                    <input style={{ height: "15px", width: "15px", margin: "5px 5px 8px 5px" }} className="form-check-input"
                      type="checkbox" id="terms" name="terms" value={signupForm.values.terms}
                      checked={signupForm.values.terms} onChange={signupForm.handleChange} />
                    <small className="w-100" style={{ fontSize: '0.95em' }} >By creating account you agree to our &nbsp; <Link className="text-primary">Terms of Services</Link></small>
                  </label>
                  <div>
                    <ErrorMessage name={`terms`} component="small" className='text-danger' />
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary w-100" onClick={signupForm.handleSubmit}>Sign Up <i className="fa-solid fa-arrow-right"></i></button>
                  <div className="mt-3">
                    Have an account?&nbsp; &nbsp;<Link className="text-primary" onClick={() => { setShowLogin(true); signupForm.resetForm(); }}>Sign In</Link>
                  </div>
                </div>

              </Form>
            </FormikProvider>
          </div>}
          {
            showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} setShow={setShow} />
          }
        </div>
      </div>


    </div>
  );
}
SignupPage.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  showLogin: PropTypes.bool,
  setShowLogin: PropTypes.func,
}
export default SignupPage;
