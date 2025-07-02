import moment from "moment"
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { createUserSchema } from "../../Schema";
import { post_data } from "../../ApiServices";
import { convertToPayload } from "../../Utils";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
function UserList() {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); categoryForm.resetForm(); };
    const handleShow = () => setShow(true);
    const UserForm = useFormik({
        initialValues: {
            fullName: "",
            mobileNo: "",
            emailId: "",
            userPassword: "",
            confirmPassword: "",
        },
        validationSchema: createUserSchema,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
            createUser();
        },

    })

    const getUserList = () => {
        post_data("portal/private", convertToPayload('get-user-list', {}), {})
            .then((response) => {
                if (response.status) {
                    alert("Signup successful! Please log in.");
                } else {
                    alert("Signup failed. Please try again.");
                }
            }).catch((error) => {
                console.error("Error during signup:", error);
                // alert("An error occurred during signup. Please try again.");
            })
    }
    const createUser = () => {
        let payload = {
            fullName: UserForm.values.fullName,
            mobileNo: UserForm.values.mobileNo,
            emailId: UserForm.values.emailId,
            userPassword: UserForm.values.userPassword,
        }
        post_data("portal/private", convertToPayload('add-category', payload), {})
            .then((response) => {
                if (response.status) {
                    alert("Signup successful! Please log in.");
                } else {
                    alert("Signup failed. Please try again.");
                }
                handleClose();
                getUserList();
            }).catch((error) => {
                handleClose();
                console.error("Error during signup:", error);
                // alert("An error occurred during signup. Please try again.");
            })
    };

    useEffect(() => {
        getUserList();
    }, [])
    return (
        <div className="mx-2">
            <div className="d-flex justify-content-between my-2">
                <h1 className="">Users</h1>
                <button className="btn btn-primary py-1" onClick={handleShow}>Add User</button>
            </div>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Full Name</th>
                        <th>Email Id</th>
                        <th>Mobile Number</th>
                        <th>Approved Status</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Jhon Doe</td>
                        <td>Jhon@gmail.com</td>
                        <td>7756833443</td>
                        <td>Pending</td>
                        <td>{moment().format('DD-MMM-yyyy')}</td>
                        <td>
                            <div className="d-flex">
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                />
                                <button className="btn btn-primary btn-sm mx-2" title="Edit User">
                                    <i className="fa fa-pencil" ></i>
                                </button>
                                <button className="btn btn-danger btn-sm" title="Delete User">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormikProvider value={UserForm}>
                        <Form className="login-form"  >
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" id="fullName" name="fullName" placeholder="Enter your full fullName"
                                    value={UserForm.values.fullName} onChange={UserForm.handleChange} onBlur={UserForm.handleBlur} />
                                <ErrorMessage name={`fullName`} component="small" className='text-danger' />
                            </div>

                            <div className="form-group">
                                <label htmlFor="emailId">Email Address</label>
                                <input
                                    type="text" id="emailId" name="emailId" placeholder="Enter your email"
                                    value={UserForm.values.emailId} onChange={UserForm.handleChange} onBlur={UserForm.handleBlur} />
                                <ErrorMessage name={`emailId`} component="small" className='text-danger' />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobileNo">Phone Number</label>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{ paddingRight: "5px" }}>+91</span>
                                    <input type="text" id="mobileNo" name="mobileNo" placeholder="Enter 10-digit number"
                                        value={UserForm.values.mobileNo} onChange={UserForm.handleChange} onBlur={UserForm.handleBlur} />
                                </div>
                                <ErrorMessage name={`mobileNo`} component="small" className='text-danger' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userPassword">Password</label>
                                <input type="password" id="userPassword" name="userPassword" placeholder="Enter your password"
                                    value={UserForm.values.userPassword} onChange={UserForm.handleChange} onBlur={UserForm.handleBlur} />
                                <ErrorMessage name={`userPassword`} component="small" className='text-danger' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter your password"
                                    value={UserForm.values.confirmPassword} onChange={UserForm.handleChange} onBlur={UserForm.handleBlur} />
                                <ErrorMessage name={`confirmPassword`} component="small" className='text-danger' />
                            </div>
                        </Form>
                    </FormikProvider>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="button" onClick={UserForm.handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserList
