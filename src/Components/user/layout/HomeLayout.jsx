import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react';

function HomeLayout() {
    const [pageData, setPageData] = useState('');
    return (
        <div className="home-layout">
            <Header />
            <div className="container-fluid col-12 mt-3">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <Sidebar setPageData={setPageData} />
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                        <Outlet context={{ pageData }} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomeLayout
