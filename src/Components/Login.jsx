
import { Link, useLocation } from "react-router-dom";
import { post_data } from "../ApiServices";
import { convertToPayload, setTokenData } from "../Utils";
import { FormikProvider, useFormik } from "formik";
import { loginFormSchema } from "../Schema";
import { Form } from "react-bootstrap";
import FloatingInputLabel from "./user/UtilComponent/FloatingInputLabel";
import PropTypes from 'prop-types';
import { error_swal_toast, success_swal_toast } from "../SwalServices";
function Login({ setModalName, setShow }) {
    const Loginform = useFormik({
        initialValues: {
            emailId: "",
            userPassword: ""
        },
        validationSchema: loginFormSchema,
        onSubmit: () => {
            handleSubmit();
        },

    })

    const handleSubmit = () => {
        let payload = {
            emailId: Loginform.values.emailId,
            userPassword: Loginform.values.userPassword,
        }
        post_data("portal/public", convertToPayload('login', payload), {})
            .then((response) => {
                if (response.status) {
                    setTokenData(response.data.result);
                    setShow(false);
                    success_swal_toast(response.data.message || "login successfully")
                } else {
                    error_swal_toast(response.data.message || "something went wrong");
                }
            }).catch((error) => {
                error_swal_toast(error.message || "something went wrong");
                console.error("Error during signup:", error);
            })
    };

    return (
        <div className="">
            <FormikProvider value={Loginform}>
                <Form className="">
                    <div className="" style={{ opacity: '0' }}>
                        <FloatingInputLabel fieldName={`emailId12`} formikFrom={Loginform} labelText={`Email Address`} />
                    </div>
                    <h3>Sign In</h3>
                    <p className="text-muted">Sign In your account</p>
                    <div className="">
                        <FloatingInputLabel fieldName={`emailId`} formikFrom={Loginform} labelText={`Email Address`} />
                    </div>
                    <div className="">
                        <FloatingInputLabel fieldName={`userPassword`} formikFrom={Loginform} labelText={`Password`} fieldType={`password`} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <label className="form-label mb-1" htmlFor="keppSign">
                            <input style={{ height: "15px", width: "15px", margin: "5px 5px 8px 5px" }} className="form-check-input"
                                type="checkbox" id="keppSign" name="terms" />
                            <small className="w-100" style={{ fontSize: '0.95em' }} >Keep me signed in </small>
                        </label>
                        <small><Link className="text-primary" onClick={() => { setModalName('forget-pass') }}>Forgot Password?</Link></small>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary w-100" onClick={Loginform.handleSubmit}>Sign In <i className="fa-solid fa-arrow-right"></i></button>
                        <div className="mt-3">
                            New to Our Product ?&nbsp; &nbsp;<Link className="text-primary" onClick={() => { setModalName('signup'); Loginform.resetForm() }}>Sign Up</Link>
                        </div>
                    </div>
                    <div className="" style={{ opacity: '0' }}>
                        <FloatingInputLabel fieldName={`emailId1234`} formikFrom={Loginform} labelText={`Email Address`} />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
}
Login.propTypes = {
    setModalName: PropTypes.func,
    setShow: PropTypes.func,
}
export default Login;
