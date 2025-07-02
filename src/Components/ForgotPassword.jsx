
import { Link } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import { forgotPassSchema } from "../Schema";
import { Form } from "react-bootstrap";
import FloatingInputLabel from "./user/UtilComponent/FloatingInputLabel";
import PropTypes from 'prop-types';
import { useState } from "react";
import { error_swal_toast, success_swal_toast } from "../SwalServices";
import { sendEmail } from "../Utils";
function ForgotPassword({ setModalName, setShowLogin }) {
    const [isLinkSent, setIsLinkSent] = useState(false);
    const forgotPasswordForm = useFormik({
        initialValues: {
            emailId: "",
            "emailId12-forgetpass": "",
            "emailId-forgetpass": ""
        },
        validationSchema: forgotPassSchema,
        onSubmit: () => {
            handleSubmit();
        },

    })

    const handleSubmit = async () => {
        let url = import.meta.env.VITE_APP_BASE_URL
        let payload = {
            subject: "Reset Password",
            contentType: 'text/html',
            toRecepients: [forgotPasswordForm.values.emailId],
            ccRecepients: [],
            bccRecepients: [],
            attachments: {},
            body: "<html><body><p>Click on the below link to reset password</p><a href='" + url + "reset'>" + url + "reset</a></body></html>",
        }
        const result = await sendEmail(payload);
        if (result.status === 200) {
            setIsLinkSent(true);
            success_swal_toast(result.message || "Email sent successfully");
        } else {
            error_swal_toast(result.message || "Please try again.");
        }



        // post_data_email(`${import.meta.env.VITE_API_BASE_URL}email/send`, JSON.stringify(payload), {})
        //     .then((response) => {
        //         if (response.status) {
        //             setIsLinkSent(true);
        //             success_swal_toast(response.data.message || "Email sent successfully");
        //         } else {
        //             error_swal_toast(response.data.message || "Please try again.");
        //         }
        //     }).catch((error) => {
        //         console.error("Error during signup:", error);
        //     })
    };



    return (
        <div className="">
            {
                !isLinkSent && <FormikProvider value={forgotPasswordForm}>
                    <Form className="my-4">
                        <div className="" style={{ opacity: '0' }}>
                            <FloatingInputLabel fieldName={`emailId12-forgetpass`} formikFrom={forgotPasswordForm} labelText={`Email Address`} />
                        </div>
                        <h3>Forgot Password</h3>
                        <p className="text-muted">Don't worry we'll help you to reset your password</p>
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
                                <Link className="text-primary" onClick={() => { setModalName('login'); forgotPasswordForm.resetForm() }}>Back to Sign In</Link>
                            </div>
                        </div>
                        <div className="mb-1" style={{ opacity: '0' }}>
                            <FloatingInputLabel fieldName={`emailId-forgetpass`} formikFrom={forgotPasswordForm} labelText={`Email Address`} />
                        </div>
                    </Form>
                </FormikProvider>
            }
            {isLinkSent &&
                <div className="d-flex align-item-center loginModalHeight">
                    <div className="linktext">
                        <img src="/assets/img/success.png" alt="NA" className="my-3" />
                        <p>
                            Kindly check your mail box, a reset link has been shared over the mail.
                        </p>
                        <div className="d-flex justify-content-between mt-3">
                            <small className="" style={{ fontSize: '0.95em' }} >Haven't received link?</small>
                            <small><Link className="text-primary">Resend Link</Link></small>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
ForgotPassword.propTypes = {
    setModalName: PropTypes.func,
    setShowLogin: PropTypes.func,
}
export default ForgotPassword;
