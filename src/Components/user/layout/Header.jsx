import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignupPage from "../../SignupPage";
function Header() {
    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
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
                            <Link className="btn btn-primary" onClick={() => { setShowLogin(false); setShow(true) }}>Sign Up</Link>
                            <Link className="btn btn-outline-primary" onClick={() => { setShowLogin(true); setShow(true) }}>Sign In</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <Modal size="lg" show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton className="border-bottom-0 py-0"></Modal.Header>
                <Modal.Body className="pt-0">
                    <SignupPage show={show} setShow={setShow} showLogin={showLogin} setShowLogin={setShowLogin} />
                </Modal.Body>
                {/* <Modal.Footer>
                </Modal.Footer> */}
            </Modal>
        </div>
    )
}

export default Header
