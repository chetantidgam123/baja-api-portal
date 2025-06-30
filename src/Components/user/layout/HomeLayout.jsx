import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function HomeLayout() {
    return (
        <div className="home-layout">
            <Header />
            <div className="m-2 outlet g-0">
                <Sidebar />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default HomeLayout
