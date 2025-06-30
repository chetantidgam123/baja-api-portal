
import { Link } from "react-router-dom";
import { post_data } from "../ApiServices";
import { convertToPayload } from "../Utils";
import { FormikProvider, useFormik } from "formik";
import { forgotPassSchema } from "../Schema";
import { Form } from "react-bootstrap";
import FloatingInputLabel from "./user/UtilComponent/FloatingInputLabel";
import PropTypes from 'prop-types';
import { useState } from "react";
import ResetPasswrd from "./ResetPasswrd";
function ForgotPassword({ setShowForgotPass, setShowLogin }) {
    const [showResetPassword, setShowResetPassword] = useState(false)
    const forgotPasswordForm = useFormik({
        initialValues: {
            emailId: "",
        },
        validationSchema: forgotPassSchema,
        onSubmit: () => {
            handleSubmit();
        },

    })

    const handleSubmit = () => {
        setShowResetPassword(true);
        return
        let payload = {
            emailId: forgotPasswordForm.values.emailId,
        }
        post_data("public", convertToPayload('login', payload), {})
            .then((response) => {
                if (response.status) {
                    console.log(response.data)
                } else {
                    alert("Signup failed. Please try again.");
                }
            }).catch((error) => {
                console.error("Error during signup:", error);
            })
    };

    return (
        <div className="">
            {!showResetPassword && <FormikProvider value={forgotPasswordForm}>
                <Form className="my-4">
                    <div className="" style={{ opacity: '0' }}>
                        <FloatingInputLabel fieldName={`emailId12`} formikFrom={forgotPasswordForm} labelText={`Email Address`} />
                    </div>
                    <h3>Sign In</h3>
                    <p className="text-muted">Sign In your account</p>
                    <div className="">
                        <FloatingInputLabel fieldName={`emailId`} formikFrom={forgotPasswordForm} labelText={`Email Address`} />
                    </div>
                    <div className="d-flex justify-content-between mt-5 mb-4">
                        <small className="" style={{ fontSize: '0.95em' }} >Haven't received link?</small>
                        <small><Link className="text-primary">Resend Link</Link></small>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary w-100" onClick={forgotPasswordForm.handleSubmit}>Send Link <i className="fa-solid fa-arrow-right"></i></button>
                        <div className="mt-2 mb-1">
                            <Link className="text-primary" onClick={() => { setShowForgotPass(false); forgotPasswordForm.resetForm() }}>Back to Sign In</Link>
                        </div>
                    </div>
                    <div className="mb-1" style={{ opacity: '0' }}>
                        <FloatingInputLabel fieldName={`emailId1234`} formikFrom={forgotPasswordForm} labelText={`Email Address`} />
                    </div>
                </Form>
            </FormikProvider>}
            {
                showResetPassword && <ResetPasswrd setShowLogin={setShowLogin} />
            }
        </div>
    );
}
ForgotPassword.propTypes = {
    setShowForgotPass: PropTypes.func,
    setShowLogin: PropTypes.func,
}
export default ForgotPassword;
