import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignupPage from "../../SignupPage";
import Login from "../../Login";
import ForgotPassword from "../../ForgotPassword";
import ResetPassword from "../../ResetPasswrd";
function Header() {
    const [show, setShow] = useState(false);
    const [modalName, setModalName] = useState("")
    useEffect(() => {
        if (location.pathname.includes('reset')) {
            setShow(true);
            setModalName('reset-pass');
        }
    }, [location])
    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg px-4">
                <div className="container-fluid bg-white">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src="/assets/img/logo.png" alt="Logo" className="logo-img me-2" />
                    </Link>

                    {/* Toggle Button for mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCenterContent" aria-controls="navbarCenterContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Content */}
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCenterContent">
                        {/* Center: Links */}
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>

                        <div className="d-flex gap-2 authBtn">
                            <Link className="btn btn-primary" onClick={() => { setModalName('signup'); setShow(true) }}>Sign Up</Link>
                            <Link className="btn btn-outline-primary" onClick={() => { setModalName('login'); setShow(true) }}>Sign In</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <Modal size="lg" show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton className="border-bottom-0 py-0"></Modal.Header>
                <Modal.Body className="pt-0">
                    <div className="col-12 px-3">
                        <div className="row">
                            <div className="col-xl-5 col-lg-5 col-md-5 col-12 signUpsideBanner">
                                <img src="/assets/img/Bajaj Logo.png" alt="NA" className="mt-2" />
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-7 col-12 ps-4">
                                {modalName == 'signup' && <SignupPage setModalName={setModalName} setShow={setShow} />}
                                {modalName == 'login' && <Login setModalName={setModalName} setShow={setShow} />}
                                {modalName == 'forget-pass' && <ForgotPassword setModalName={setModalName} setShow={setShow} />}
                                {modalName == 'reset-pass' && <ResetPassword setModalName={setModalName} setShow={setShow} />}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Header
