import moment from "moment"
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { post_data } from "../../ApiServices";
import { convertToPayload } from "../../Utils";
import { useNavigate } from "react-router-dom";
function ApiList() {
    const navigate = useNavigate();
    const getApiList = () => {
        post_data("private", convertToPayload('get-api-list', {}), {})
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

    useEffect(() => {
        getApiList();
    }, [])
    return (
        <div className="mx-2">
            <div className="d-flex justify-content-between my-2">
                <h1 className="">Category List</h1>
                <button className="btn btn-primary py-1" onClick={() => { navigate(`/${import.meta.env.VITE_ADMIN_BASE_PATH}/create-api`) }} >Add Api</button>
            </div>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Api Name</th>
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
        </div>
    )
}

export default ApiList
