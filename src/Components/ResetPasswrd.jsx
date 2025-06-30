
import { post_data } from "../ApiServices";
import { convertToPayload, setTokenData } from "../Utils";
import { FormikProvider, useFormik } from "formik";
import { resetPassSchema } from "../Schema";
import { Form } from "react-bootstrap";
import FloatingInputLabel from "./user/UtilComponent/FloatingInputLabel";
import PropTypes from 'prop-types';
import { error_swal_toast, success_swal_toast } from "../SwalServices";
function ResetPassword({ setShowLogin }) {

    const resetPassForm = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: resetPassSchema,
        onSubmit: () => {
            handleSubmit();
        },

    })

    const handleSubmit = () => {
        setShowLogin(true);
        return
        let payload = {
            password: resetPassForm.values.password,
            confirmPassword: resetPassForm.values.confirmPassword,
        }
        post_data("public", convertToPayload('login', payload), {})
            .then((response) => {
                if (response.status) {
                    setTokenData(response.data.result);
                    setShowLogin(true);
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
            <FormikProvider value={resetPassForm}>
                <Form className="">
                    <div className="" style={{ opacity: '0', height: '82px' }}>
                        <FloatingInputLabel fieldName={`emailId12`} formikFrom={resetPassForm} labelText={`Email Address`} />
                    </div>
                    <h3>Almost there !</h3>
                    <p className="text-muted">Create new password for your account</p>
                    <div className="">
                        <FloatingInputLabel fieldName={`password`} formikFrom={resetPassForm} labelText={`Password`} fieldType={`password`} />
                    </div>
                    <div className="mb-5">
                        <FloatingInputLabel fieldName={`confirmPassword`} formikFrom={resetPassForm} labelText={`Confirm Password`} fieldType={`password`} />
                    </div>
                    <div className="text-center my-4">
                        <button type="button" className="btn btn-primary w-100" onClick={resetPassForm.handleSubmit}>Update Password <i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                    <div className="" style={{ opacity: '0', height: '82px' }}>
                        <FloatingInputLabel fieldName={`emailId1234`} formikFrom={resetPassForm} labelText={`Email Address`} />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
}
ResetPassword.propTypes = {
    setShowLogin: PropTypes.func,
}
export default ResetPassword;
