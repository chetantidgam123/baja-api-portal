import { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { Link, useOutletContext } from 'react-router-dom';
import LangCurlExecuteComp from './LangCurlExecuteComp';
import SyntaxHighLighter from './SyntaxHighLighter';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
function HomePageContent() {
    const { pageData } = useOutletContext();
    const [show, setShow] = useState(false)
    const codeString = '{}'

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="center-content">
                    <div className="card">
                        <div className="card-body">
                            <h5>Introduction</h5>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageData.description || "Update in Progress"}</ReactMarkdown>
                        </div>
                    </div>
                    <div className="card  my-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="">Request Sample :</h5>
                                <Link><img src="/assets/img/copy.png" alt="copy" /></Link>
                            </div>
                            <SyntaxHighLighter jsonString={codeString} />
                        </div>
                    </div>
                    <div className="card ">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h5>Request Parameters Details :</h5>
                                <button type="button" className="btn btn-outline-primary" onClick={() => { setShow(true) }}>View in detail</button>
                            </div>
                            <div className="table-responsive-custom">
                                <Table bordered responsive='lg'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Data Type</th>
                                            <th>Required/Optional</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>subSourceOfEnquirey</td>
                                            <td>String</td>
                                            <td>Required</td>
                                            <td>Lorem, ipsum dolor sit amet consectetur...</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="card  my-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h5>Request Headers :</h5>
                            </div>
                            <div className="table-responsive-custom">
                                <Table bordered responsive='lg'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Data Type</th>
                                            <th>Required/Optional</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>subSourceOfEnquirey</td>
                                            <td>String</td>
                                            <td>Required</td>
                                            <td>Lorem, ipsum dolor sit amet consectetur...</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="card  my-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="">Response Sample :</h5>
                                <Link><img src="/assets/img/copy.png" alt="copy" /></Link>
                            </div>
                            <SyntaxHighLighter jsonString={codeString} />
                        </div>
                    </div>
                    <div className="card ">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h5>Response Parameters Details :</h5>
                                <button type="button" className="btn btn-outline-primary" onClick={() => { setShow(true) }}>View in detail</button>
                            </div>
                            <div className="table-responsive-custom">
                                <Table bordered responsive='lg'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Data Type</th>
                                            <th>Required/Optional</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>subSourceOfEnquirey</td>
                                            <td>String</td>
                                            <td>Required</td>
                                            <td>Lorem, ipsum dolor sit amet consectetur...</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="card  my-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h5>Response Headers :</h5>
                            </div>
                            <div className="table-responsive-custom">
                                <Table bordered responsive='lg'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Data Type</th>
                                            <th>Required/Optional</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>subSourceOfEnquirey</td>
                                            <td>String</td>
                                            <td>Required</td>
                                            <td>Lorem, ipsum dolor sit amet consectetur...</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="right-content">
                    <LangCurlExecuteComp />
                </div>
            </div>
            <Modal size="xl" show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton className="border-bottom-0"><h4>Request Parameters Details :</h4></Modal.Header>
                <Modal.Body >
                    <div className="table-responsive-custom">
                        <Table bordered responsive='lg'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Data Type</th>
                                    <th>Required/Optional</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>subSourceOfEnquirey</td>
                                    <td>String</td>
                                    <td>Required</td>
                                    <td>Lorem, ipsum dolor sit amet consectetur...</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    );
}

export default HomePageContent;