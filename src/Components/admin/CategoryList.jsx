import moment from "moment"
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { categoryFormSchema } from "../../Schema";
import { post_data } from "../../ApiServices";
import { convertToPayload } from "../../Utils";
import { useFormik } from "formik";
function CategoryList() {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); categoryForm.resetForm(); };
    const handleShow = () => setShow(true);
    const categoryForm = useFormik({
        initialValues: {
            categoryName: "",
        },
        validationSchema: categoryFormSchema,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
            addCategory();
        },

    })

    const getCategoryList = () => {
        post_data("private", convertToPayload('get-all-categories', {}), {})
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
    const addCategory = () => {
        let payload = {
            categoryName: categoryForm.values.categoryName,
        }
        post_data("private", convertToPayload('add-category', payload), {})
            .then((response) => {
                if (response.status) {
                    alert("Signup successful! Please log in.");
                } else {
                    alert("Signup failed. Please try again.");
                }
                handleClose();
            }).catch((error) => {
                handleClose();
                console.error("Error during signup:", error);
                // alert("An error occurred during signup. Please try again.");
            })
    };

    useEffect(() => {
        getCategoryList();
    }, [])
    return (
        <div className="mx-2">
            <div className="d-flex justify-content-between my-2">
                <h1 className="">Category List</h1>
                <button className="btn btn-primary py-1" onClick={handleShow}>Add Category</button>
            </div>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Catrgory Name</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Encryption & Decryption</td>
                        <td>{moment().format('DD-MMM-yyyy')}</td>
                        <td>
                            <div className="d-flex">
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                />
                                <button className="btn btn-primary btn-sm mx-2" title="Edit Category">
                                    <i className="fa fa-pencil" ></i>
                                </button>
                                <button className="btn btn-danger btn-sm" title="Delete Category">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="form-label" htmlFor="category-name">Category Name</label>
                    <input type="text" className="form-control" id="category-name" name="categoryName"
                        placeholder="Enter category name" value={categoryForm.values.categoryName}
                        onChange={categoryForm.handleChange} onBlur={categoryForm.handleBlur} />
                    {categoryForm.touched.categoryName && categoryForm.errors.categoryName ? (
                        <small className="text-danger">{categoryForm.errors.categoryName}</small>
                    ) : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="button" onClick={categoryForm.handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CategoryList
