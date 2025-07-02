import moment from "moment"
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { subCategoryFormSchema } from "../../Schema";
import { post_data } from "../../ApiServices";
import { convertToPayload } from "../../Utils";
import { useFormik } from "formik";
function SubCategoryList() {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); subcategoryForm.resetForm(); };
    const handleShow = () => setShow(true);
    const subcategoryForm = useFormik({
        initialValues: {
            subcategoryName: "",
            categoryId: "",
        },
        validationSchema: subCategoryFormSchema,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
            addSubCategory();
        },

    })

    const getSubCategoryList = () => {
        post_data("portal/private", convertToPayload('get-sub-category-list', {}), {})
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
    const addSubCategory = () => {
        let payload = {
            subcategoryName: subcategoryForm.values.subcategoryName,
            categoryId: subcategoryForm.values.categoryId,
        }
        post_data("portal/private", convertToPayload('add-sub-category', payload), {})
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
        getSubCategoryList();
    }, [])
    return (
        <div className="mx-2">
            <div className="d-flex justify-content-between my-2">
                <h1 className="">Sub Category List</h1>
                <button className="btn btn-primary py-1" onClick={handleShow}>Add Sub Category</button>
            </div>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Sub Catrgory Name</th>
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
                    <Modal.Title>Add Sub Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="category-name">Category Name</label>
                        <select className="form-select" id="category-name" name="categoryId"
                            value={subcategoryForm.values.categoryId}
                            onChange={subcategoryForm.handleChange} onBlur={subcategoryForm.handleBlur}>
                            <option value="">Select Category</option>
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                        </select>
                        {subcategoryForm.touched.categoryId && subcategoryForm.errors.categoryId ? (
                            <small className="text-danger">{subcategoryForm.errors.categoryId}</small>
                        ) : null}
                    </div>
                    <div>
                        <label className="form-label" htmlFor="subcategoryName">Sub Category Name</label>
                        <input type="text" className="form-control" id="subcategoryName" name="subcategoryName"
                            placeholder="Enter sub category name" value={subcategoryForm.values.subcategoryName}
                            onChange={subcategoryForm.handleChange} onBlur={subcategoryForm.handleBlur} />
                        {subcategoryForm.touched.subcategoryName && subcategoryForm.errors.subcategoryName ? (
                            <small className="text-danger">{subcategoryForm.errors.subcategoryName}</small>
                        ) : null}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="button" onClick={subcategoryForm.handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SubCategoryList
