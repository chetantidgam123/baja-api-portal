import React from 'react'
const Sidebar = React.lazy(() => import('./Sidebar'))
function Header() {
    return (
        <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <i className="fa-solid fa-bars"></i>
            </button>
            <Sidebar />
        </div>
    )
}

export default Header
